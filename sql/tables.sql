DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS conversations;

CREATE TABLE users(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(20),
  avatar INT4,
  device_system VARCHAR(40),
  device_token TEXT,
  online_status VARCHAR(20),
  privacy_status VARCHAR(20)
);

CREATE TABLE conversations(
  id SERIAL8 PRIMARY KEY,
  creation_date DATE
);

CREATE TABLE participants(
  id SERIAL8 PRIMARY KEY,
  user_id INT8 REFERENCES users(id)
);

CREATE TABLE messages(
  id SERIAL8 PRIMARY KEY,
  message TEXT,
  user_id INT8 REFERENCES users(id),
  conversation_id INT8 REFERENCES conversations(id),
  sent_timestamp TIMESTAMP WITH TIME ZONE
);
