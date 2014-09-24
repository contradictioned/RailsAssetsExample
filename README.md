RailsAssetsExample
==================

The following is a copy of the blog post on http://www.polythematik.de/postings/53

With this posting I want to take a look at [Rails Assets](https://rails-assets.org/), which claims to be a "frictionless proxy between Bundler and Bower". Since I head some trouble to get bower to play directly (and nicely) with Ruby on Rails and the gems which distribute some CSS/JS libraries like Bootstrap or Gumby are not necessarily up to date or don't even exist or are just unneccessary copies of code.

Anyways, I like looking at new things, so let's get started with a fresh rails project.

Action
------

Like on the Rails-Assets-website put this into your Gemfile:

    source 'https://rails-assets.org'
    
    ...
    
    gem 'rails-assets-gumby'
    
    ...

And

    $ bundle install

For playing around we use the web's hello world:

    $ rails g scaffold post title content
    $ rake db:migrate


Now when visiting http://localhost:3000/posts, the assets pipeline greets with:

    Asset filtered out and will not be served: add `Rails.application.config.assets.precompile += %w( gumby/fonts/icons/entypo.eot )` to `config/initializers/assets.rb` and restart your server

This indeed solves the problem but has to be done for every font, such that in total you end up with adding these to the initializer:

    Rails.application.config.assets.precompile += %w( gumby/fonts/icons/entypo.eot )
    Rails.application.config.assets.precompile += %w( gumby/fonts/icons/entypo.woff )
    Rails.application.config.assets.precompile += %w( gumby/fonts/icons/entypo.ttf )

But after this, you can see how gumby gets loaded. I don't go into details about using gumby, as their [documentation](http://gumbyframework.com/docs/) is just nice to read.

One thing that is still missing, is modernizr. It's required for Gumby's js code to run, but unfortunateley not included in its dependencies. So we have to add modernizr, e.g. by putting the Rails Assets version into the Gemfile:

    ...
    gem 'rails-assets-modernizr'

Unfortunateley this way you *cannot modify* Gumby's settings.


In order to show blogposts nicely and to use another gem, lets see how [markdown-js](https://github.com/Leeft/markdown-js) performs.

    gem 'rails-assets-markdown-js'
    $ bundle install

In order to get the correct javascript file for markdown, we put this into the `application.js`

    //= require markdown-js/dist/markdown.js

But finding this file to include took some ls-action in the gem's installation directory.


Conclusion
----------

I really did not choose these gems because they show shortcomings, I just was interested in them. Maybe others work fine.

*Pro:* Rails Assets seems like a great way of including bower components conveniently into a Rails application. Bonus point: No more gems that just copy the actual component like the gumby-framework plugin.

*Contra:* Rails Assets seems not to be nice for configure-and-compile code like Gumby. Also the manual selection of the markdown-js script seems not smooth, yet. Maybe an own directory similar to the one used by [package controll](https://sublime.wbond.net/) would be a solution? But this would be less frictionless.

So, when I want to include "use-only-web-components", I definitely will use rails assets; but not for stylables like Gumby.