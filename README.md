# YouNote

YouNote is a learning tool where you can can search for videos from youtube and take notes while watching them. Make them
public so that other users can see what you're learning. 

Visit YouNote [here](https://younote.herokuapp.com)  

# About 

YouNote is an application built with Ruby on Rails, that utlizes Bootsrap, JQuery and runs Postgres as the db in production. 

**Cool** **Implentations:**

* Users can edit change font styles and add tables into thier notes via jQuery

* Automatic save of note every 60s via AJAX request. 

* Users can make notes public or private

* Infinite scroll on home page for all public notes using will_paginate gem and AJAX request.

# Installation
			
`git clone https://github.com/tylergaugler16/youNote.git`
`cd youNote`

`bundle install`
`bundle exec rake db:create`
`bundle exec rake db:create`

# Run With:
`rails server`

	