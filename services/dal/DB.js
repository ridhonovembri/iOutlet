import * as SQLite from 'expo-sqlite'

export default ConnectToDB = async () =>{
    return await SQLite.openDatabaseAsync('mySQLiteDB.db')
}