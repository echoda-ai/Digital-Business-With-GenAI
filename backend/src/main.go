package main

import (
	utils "genai/src/utils"

	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
)

func main() {
	envConfig := utils.LoadEnvConfig()

	e := echo.New()

	// logger
	utils.NewLogger()
	e.Use(utils.LoggingMiddleware)

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	// routes
	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})

	utils.Logger.LogInfo().Msg(e.Start(":" + envConfig.Port).Error())

}
