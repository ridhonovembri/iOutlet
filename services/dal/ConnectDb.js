import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const LoadDatabase = async () => {
  // const dbName = "mySQLiteDB.db";
  // const dbAsset = require("../../assets/mySQLiteDB.db");
  // const dbUri = Asset.fromModule(dbAsset).uri;
  // const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  // const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  // if (!fileInfo.exists) {
  //   await FileSystem.makeDirectoryAsync(
  //     `${FileSystem.documentDirectory}SQLite`,
  //     { intermediates: true }
  //   );
    

  //   await FileSystem.downloadAsync(dbUri, dbFilePath);
  // }
};

export default LoadDatabase;
