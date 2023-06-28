PROIECT TW. Codreanu Robert & Calinciuc Laura


How to set a user as admin: cd Database; sqlite3 person.db; UPDATE users SET isAdmin = 1 WHERE username = 'name_username'; cd ..
To populate plantAbout table uncomment the line from the top of server.js file and then restart the server. After populating, the line must be back commented to not insert multiple times the same data. This note will be applied only if the person.db is deleted.