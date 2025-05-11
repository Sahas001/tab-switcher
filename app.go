package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

type Tab struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) GetTabs() []Tab {
	resp, err := http.Get("http://localhost:9222/json")
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	var tabs []Tab
	err = json.NewDecoder(resp.Body).Decode(&tabs)
	if err != nil {
		return nil
	}
	return tabs
}

func (a *App) ActivateTab(id string) {
	http.Post("http://localhost:9222/json/activate/"+id, "", nil)
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
