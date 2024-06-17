package main

import (
	"github.com/labstack/echo/v4"

	utils "genai/src/utils"
)

func main() {
	envConfig := utils.LoadEnvConfig()

	e := echo.New()

	// logger
	utils.NewLogger()
	e.Use(utils.LoggingMiddleware)

	// routes
	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})

	utils.Logger.LogInfo().Msg(e.Start(":" + envConfig.Port).Error())

}
