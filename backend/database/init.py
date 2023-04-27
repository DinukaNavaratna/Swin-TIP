import os
import mysql.connector
from mysql.connector import Error
from loguru import logger


def CreateDB():
  try:
    db = mysql.connector.connect(
      host = os.getenv("DB_HOST"),
      user = os.getenv("DB_USER"),
      password = os.getenv("DB_PASSWORD")
    )
  except Error as exception:
    logger.error(exception)
    return "Database conncection error!"

  if db.is_connected():
    cursor = db.cursor()
    cursor.execute("DROP DATABASE tip")
    cursor.execute("CREATE DATABASE tip")
    return "Database created"
  else:
    return "Database not created"
  

def CreateTables():
  db = mysql.connector.connect(
      host = os.getenv("DB_HOST"),
      user = os.getenv("DB_USER"),
      password = os.getenv("DB_PASSWORD"),
      database = os.getenv("DB_DATABASE")
    )
  cursor = db.cursor()

  cursor.execute("""CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(32),
  public_id VARCHAR(32) UNIQUE,
  user_type INT(1) DEFAULT 0 COMMENT '0-casual, 1-permanent, 2-admin',
  status INT(1) DEFAULT 0 COMMENT '0-pending, 1-active, 2-deactivated',
  PRIMARY KEY (id))""")

  cursor.execute("""CREATE TABLE IF NOT EXISTS vacancies (
  id INT NOT NULL AUTO_INCREMENT,
  public_id VARCHAR(32) UNIQUE,
  title VARCHAR(50),
  module INT(1) COMMENT 'modules table ref',
  ref VARCHAR(32),
  base INT(1) DEFAULT 2 COMMENT '0-Full-time, 1-Part-time, 2-Casual',
  location VARCHAR(50),
  description VARCHAR(50),
  qualifications VARCHAR(50),
  num_applicants INT(3),
  published_by INT(1) COMMENT 'users table ref',
  publish_date VARCHAR(10) DEFAULT(CURRENT_DATE),
  last_edited_by INT(1) COMMENT 'users table ref',
  edit_date VARCHAR(10),
  status INT(1) COMMENT '1-live, 2-Deleted',
  PRIMARY KEY (id))""")

  cursor.execute("""CREATE TABLE IF NOT EXISTS modules (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(32) UNIQUE,
  PRIMARY KEY (id))""")

  cursor.execute("""CREATE TABLE IF NOT EXISTS applicants (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT(3),
  vacancy_id INT(3),
  date VARCHAR(10) DEFAULT(CURRENT_DATE),
  PRIMARY KEY (id))""")

  cursor.close()
  db.close()
  return "Tables created"


def DropTables():
  db = mysql.connector.connect(
      host = os.getenv("DB_HOST"),
      user = os.getenv("DB_USER"),
      password = os.getenv("DB_PASSWORD"),
      database = os.getenv("DB_DATABASE")
    )
  cursor = db.cursor()
  cursor.execute("DROP TABLE users;")
  cursor.execute("DROP TABLE vacancies;")
  cursor.execute("DROP TABLE modules;")
  cursor.execute("DROP TABLE applicants;")
  db.commit()
  cursor.close()
  db.close()
  return "Tables dropped"


def TruncateTables():
  db = mysql.connector.connect(
      host = os.getenv("DB_HOST"),
      user = os.getenv("DB_USER"),
      password = os.getenv("DB_PASSWORD"),
      database = os.getenv("DB_DATABASE")
    )
  cursor = db.cursor()
  cursor.execute("TRUNCATE TABLE users;")
  db.commit()
  cursor.close()
  db.close()
  return "Tables truncated"


def DummyData():
  db = mysql.connector.connect(
      host = os.getenv("DB_HOST"),
      user = os.getenv("DB_USER"),
      password = os.getenv("DB_PASSWORD"),
      database = os.getenv("DB_DATABASE")
    )
  cursor = db.cursor()

  cursor.execute("""INSERT IGNORE INTO users (email, password, public_id, user_type, status) VALUES 
  ('1@test.mail', '1146b6c258a28b28941c57851ee084a1', '7bf182afed5eda1684ecb29bae3a8588', 0, 0),
  ('2@test.mail', '1146b6c258a28b28941c57851ee084a1', '807a71a98cf0eba74dbd83e55255e408', 1, 1),
  ('3@test.mail', '1146b6c258a28b28941c57851ee084a1', '3b6888710a76469e33922bd573d76a1f', 0, 1),
  ('4@test.mail', '1146b6c258a28b28941c57851ee084a1', '70c73d64a608e710ad7e227fea08938d', 2, 1),
  ('5@test.mail', '1146b6c258a28b28941c57851ee084a1', 'f9fea2e0e5c790e8d79f8ebf0f2127c4', 1, 0);
  """)

  cursor.execute("""INSERT IGNORE INTO modules (name) VALUES 
  ('Information Technology'),
  ('Bio Science'),
  ('Phsycology'),
  ('Nursing'),
  ('Engineering');
  """)

  db.commit()
  cursor.close()
  db.close()
  return "Dummy data inserted"