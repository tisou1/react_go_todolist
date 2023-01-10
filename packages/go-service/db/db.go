package db

import (
	"database/sql"
	"fmt"
)

func DBConnect() *sql.DB {
	DB, _ := sql.Open("mysql", "root:siry@tcp(192.168.31.251:3306)/todo_db")
	// 设置最大连接数
	DB.SetConnMaxLifetime(100)
	// 设置上数据库最大闲置连接数
	DB.SetMaxIdleConns(10)

	if err := DB.Ping(); err != nil {
		fmt.Println("open database fail")
		panic(err)
	}
	fmt.Println("connect success")

	return DB
}
