const r = require('rethinkdb');
const crypto = require('crypto');
const passport = require('passport');
const passport-local = require('passport-local');

function register(username, password) {
  // Register user
}

function login(username, password) {
  // Login user
}

function deleteUser(username, password) {
  // Delete user
}

function getEntries(username) {
  // Get purchase history from users account
}

function addEntries(username, items) {
  // Add purchases for user
}

function deleteEntries(username, itemIDs) {
  // Delete purchases by ID
}
