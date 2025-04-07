package sharedgolib1

import (
	"testing"
)

func TestSharedGoLib1(t *testing.T) {
	result := SharedGoLib1("works")
	if result != "SharedGoLib1 works" {
		t.Error("Expected SharedGoLib1 to append 'works'")
	}
}
