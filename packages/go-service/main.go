package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Todo struct {
	Text string `json:"text"`
	Id   string `json:"id"`
	Done int    `json:"done"`
}

func main() {
	db := dbConnect()
	// 开启事务
	tx, err := db.Begin()

	r := gin.Default()

	r.Use(Cors())
	// 校验
	validErr(err)

	r.GET("/hello", func(c *gin.Context) {
		// c.JSON：返回JSON格式的数据
		c.JSON(200, gin.H{
			"message": "Hello world!",
		})
	})

	r.POST("/todoAdd", func(c *gin.Context) {
		var todo Todo
		// 获取请求参数
		// body, err := ioutil.ReadAll(c.Request.Body)
		// validErr(err)
		// 将body中的参数绑定到struct
		err = c.ShouldBindJSON(&todo)
		fmt.Println(todo)
		validErr(err)

		// 进行数据库的插入操作

		sql := "insert into todoList (`text`, `id`, `done`) values (?, ?, ?)"
		// 对sql语句进行预处理
		stmt, err := db.Prepare(sql)
		validErr(err)

		result, err := stmt.Exec(todo.Text, todo.Id, todo.Done)
		validErr(err)

		// 提交事务
		tx.Commit()
		// 打印插入记录的id
		fmt.Println(result.LastInsertId())

		c.JSON(http.StatusOK, gin.H{
			"msg": "success",
		})
	})

	r.GET("/todoList", func(ctx *gin.Context) {

		sql := "select * from todoList"
		// 对sql语句进行预处理
		stmt, err := db.Prepare(sql)
		validErr(err)
		rows, err := stmt.Query()
		validErr(err)
		var todos []Todo
		for rows.Next() {
			var id, text string
			var done int

			err := rows.Scan(&id, &text, &done)
			validErr(err)
			var todo Todo
			todo.Id = id
			todo.Done = done
			todo.Text = text
			todos = append(todos, todo)
		}

		ctx.JSON(http.StatusOK, gin.H{
			"todoList": todos,
		})

	})

	r.DELETE("/todoDelete/:id", func(ctx *gin.Context) {
		id := ctx.Params.ByName("id")
		fmt.Println(id)
		sql := "delete from todoList where `id` = ?"
		// 对sql进行预处理
		stmt, err := db.Prepare(sql)
		validErr(err)
		_, err = stmt.Exec(id)
		validErr(err)

		// 提交事务
		tx.Commit()
		ctx.JSON(http.StatusOK, gin.H{
			"msg": "success",
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}

func dbConnect() *sql.DB {
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

func validErr(err error) {
	if err != nil {
		panic((err))
	}
}

// cors
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*") // 可将将 * 替换为指定的域名
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}
