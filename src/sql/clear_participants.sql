
DROP TABLE IF EXISTS participants;

CREATE TABLE participants(
  id SERIAL8 PRIMARY KEY,
  user_id INT8 REFERENCES users(id),
  conversation_id INT8 REFERENCES conversations(id)
);
