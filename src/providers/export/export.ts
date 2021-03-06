import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from "@ionic-native/file";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { AlertController } from 'ionic-angular';
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { Storage } from '@ionic/storage';
import Papa from "papaparse";
import json2csv from "json2csv";

@Injectable()
export class ExportProvider {

  constructor(public http: HttpClient, public file: File, private androidPermissions: AndroidPermissions, public alertCtrl: AlertController, private fileChooser: FileChooser, public filePath: FilePath, private storage: Storage) {

  }

  writeFile(ext, data) {
    if (ext === "json") {
      return this.file.writeFile(
        this.file.externalRootDirectory + "/Download/",
        "favorites." + ext,
        data,
        {replace: true}
      );
    } else if (ext === "csv") {
      try {
        let parser = new json2csv.Parser(),
          csv = parser.parse(data);
        return this.file.writeFile(
          this.file.externalRootDirectory + "/Download/",
          "favorites." + ext,
          csv,
          {
            replace: true
          }
        );

      } catch (err) {
        console.error(err);
      }
    }
  }

  getPermissionAndWrite(file_ext, data) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          return this.writeFile(file_ext, data);
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                return this.writeFile(file_ext, data);
              }
            });
        }
      });
  }

  getPermissionAndRead(path, file) {
    return this.file.readAsText(path, file);
  }

  getFavoriteFile() {
    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri).then(path => {
          return path;
        })
      }).catch(err => {
        return err.toString();
      })
  }

  getFileAndImport() {
    return this.fileChooser.open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri).then(path => {
          let file_name = path.replace(/^.*[\\\/]/, ''),
            file_path = path.split(file_name)[0];
          this.file.readAsText(file_path, file_name).then(data => {
            if (file_name.indexOf("json") > -1) {
              this.importFavorites(data, "json");
            } else if (file_name.indexOf("csv") > -1) {
              this.importFavorites(data, "csv");
            }
          })
        })
      })
  }

  importFavorites(data, data_type) {
    this.storage.clear().then().catch();
    console.log('start');
    console.log(data_type);
    if (data_type === "json") {
      data = JSON.parse(data);
    } else if (data_type === "csv") {
      let csv = Papa.parse(data);
      console.log(csv);
      data = [];
      for (let i of csv.data.slice(1)) {
        
        // pour chaque ligne sauf celle des propriétés
        let obj = {};
        // pour chaque propriété
        for (let j in csv.data[0]) {
          obj[csv.data[0][j]] = i[j];
        }
        console.log(obj);
        data.push(obj);
      }
    }
    for (let obj of data) {
      if (obj.imdbID) {
        this.storage.set(obj.imdbID, obj)
          .then()
          .catch(
            err => console.log(err)
          )
      }
    }
  }

  showAlertJsonCreated(ext) {
    const alert = this.alertCtrl.create({
      title: ext + ' de vos Favoris créé !',
      subTitle: 'Consulté votre dossier Download pour le visualiser !',
      buttons: ['OK']
    });
    alert.present();
  }

}
