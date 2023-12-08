## 執行步驟
### step.1
如果local已經有資料庫可以修改 `app/config/db.config.js`  確保資料庫可以正常連線.(有資料庫的也可以參考DB章節的匯入,快速建立測試資料)  
如果local沒有的資料庫話可以參考最下面的DB章節,可以透用docker快速建立一個資料庫以及匯入一些測試資料.
### step.2
```
yarn
```
### step.3
```
yarn start
```

## Postman

可以透過postman匯入botrista.postman_collection.json和環境變數botristaEnv.postman_environment.json更快速了解api如何使用.



## DB
資料庫

postgresql 設定

```
docker pull postgres:14.9
```

```
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=botristaTest postgres:14.9
```

```
docker cp ./backup.sql postgres:/file.sql
```

```
docker exec -u postgres postgres psql botristaTest postgres -f /file.sql
```

### 匯出資料

```
pg_dump -U postgres -d botristaTest -f backup.sql
```

### 匯入資料

```
psql -U postgres -d botristaTest -f backup.sql
```
