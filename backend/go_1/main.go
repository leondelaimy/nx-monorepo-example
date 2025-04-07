package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func Hello(name string) string {
	result := "Hello " + name
	return result
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		jsonStr, err := json.Marshal("Hello World go_1")

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(jsonStr)
		fmt.Println("Server listening on http://localhost:3000")
	})

	log.Fatal(http.ListenAndServe(":3000", nil))
}
