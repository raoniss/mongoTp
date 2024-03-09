import { Db, MongoClient } from "mongodb"

let client

export function connecter (url,cb){
    if(!client){
        // console.log(1234);
        client = new MongoClient(url)
        // console.log(client);

        client.connect().then(()=>{
            // console.log(2);
            cb()
        }).catch((err)=>{
            if (err) {
                console.log(err);
                client = undefined
                cb(err)
            }else{
                
            }
        })
    }else{
        cb()
    }
}

export function db(){
    return new Db(client,"okey")
}

export function closeConnexion (){
    if (client) {
        client.close()
        client=undefined
    }
}

export default { connecter , db, closeConnexion,client}