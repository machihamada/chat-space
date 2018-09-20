# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## Database設計

## users
**association**
- has_many messages
- has_many group_users
- has_many groups through: :group_users

|column               |type   |constraint  |
|:--------------------|:------|:-----------|
|id                   |integer|
|name                 |string |null: false |
|email                |string |unique: true|
|password             |string |
|password_confirmation|string |
|timestamps           |

## messsages
**association**
- belongs_to user
- belongs_to group

|column   |type      |
|:--------|:------   |
|id       |integer   |
|body     |text      |
|image    |string    |
|user_id  |references|
|group_id |references|
|timestamp|          |

## groups
**association**
- has_many messages
- has_many group_users
- belongs_to users through: :group_users

|column    |type      |constraint |
|:---------|:---------|:----------|
|id        |integer   |           |
|group_name|string    |null: false|

## members
**association**
belongs_to :group
belongs_to :user

|column  |type      |onstraint                     |
|:-------|:---------|:-----------------------------|
|id      |integer   |                              |
|user_id |references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

