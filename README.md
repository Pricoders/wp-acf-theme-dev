# WordPress Theme Development: By Pricode

Built using [Advanced Custom Fields](https://www.advancedcustomfields.com/) (ACF) plugin. The ACF approach provides a simple, structured, block-based editor.
Using layouts and sub fields to design the available blocks, the theme acts as a blank canvas to which you can define, create and manage content with total control.

## Requirements

There are a couple of things you need to make sure are set up on your machine before running the commands in your terminal.

### Node.js
In order to use the build tools you will need to download and install Node.js. If you do not have Node.js installed already, you can get it by downloading the package installer from the official website. Please download the stable version of Node.js (LTS).

[Download Node.js](https://nodejs.org/en/)

### Gulp CLI

After Node is installed on your system you can now proceed to Gulp installation. To do that simply run the command below in your terminal. This will install Gulp globally.

`npm install gulp-cli -g`.

### WP-CLI
Don’t have an already set up development server. No worries! you can start a server to run [WordPress](https://wordpress.org/) using [WP-CLI](https://wp-cli.org/), the command-line interface for WordPress. You can update plugins, configure multisite installations and much more, without using a web browser.. 
Read more about [How to install WP-CLI](https://wp-cli.org/) on your local environtment. Once WP-CLI is installed, just run `wp server` command. This will start server that can be accessed via http://localhost:8080 automatically.

### Composer

[Composer](https://getcomposer.org/) is a popular dependency management tool for PHP, created mainly to facilitate installation and updates for project dependencies. The [composer](https://getcomposer.org/) website has instructions for installation if you do not have it setup.

### Install PHP dotenv

Basically, a `.env` file is an easy way to load custom configuration variables that your application needs without having to modify sensitive files like .htaccess files or Apache/nginx virtual hosts. We use `.env` file to secure our WordPress config. This means you won't have to edit the wp-config.php file outside the project, and all the environment variables are always set no matter how you run your project.

Once composer is installed on your machine, open your terminal and `cd` to your project’s root, then run `composer install` command. 

#### Example of `.env` file

``` 
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=localhost
DB_PREFIX=wp_
AUTH_KEY='...'
SECURE_AUTH_KEY='...'
LOGGED_IN_KEY='...'
NONCE_KEY='...'
AUTH_SALT='...'
LOGGED_IN_SALT='...'
NONCE_SALT='...' 
```
Adds variable definitions to the `.env` file with fresh salts provided by the [wordpress.org salt generator service](https://api.wordpress.org/secret-key/1.1/salt/).  For doing this, download and install the [wp-cli-dotenv-command](https://github.com/aaemnnosttv/wp-cli-dotenv-command/) package on your local machine..

#### WordPress Files Structure 

    ├── .env                    # .env this is the file with the WP sensitive data
    ├── site                    # This is the WordPress root directory
    │   ├── wp-admin/              
    │   ├── wp-content/             
    │   ├── wp-includes/            
    │   ├── wp-config.php           # WordPress Config file
    │   └── ...                     # The rest of WordPress files
    └── ...

## Development

- Now open the terminal and `cd` to the theme directory. This is under `wp-content/themes/quick-start`
- Install dependencies. `npm install`.
- For development we set a Gulp command that will compile the sources to dist folder. Start watch mode using `gulp dev`.
- For production we set a Gulp command that will compile and minify the CSS and JS files `gulp build`.

Styles/Sass files are under: `src/scss/`

Scripts files are under: `src/js/`

## ACF

The theme is configured to use [acf-json](https://www.advancedcustomfields.com/resources/local-json/).

The theme hides the ACF admin page from environments not running under `http://localhost:8080/`. Only change and save the custom fields locally. On production and staging environments it will read ACF data from disk since they should never be customized in the database.

## ACF Dynamic Template Approach

In order to organize the development of the design into sections (strips), each section should be small and we should be able to add it to any page.

To accomplish this we use a template called "Dynamic" and a special set of custom fiels groups.

- `Section: ...`: separate custom field group for each section with the fields appropriate for it. Each group should be set as inactive so it doesn't show in any page.
- `Partial: Sections`: the custom field group where the sections are added. Composed of a single Flexible Content field. For each section add a new entry and clone the field group for the section.
- `Template: Dynamic`: the custom field group for the Dynamic template. In here we only need to clone the `Partials: Sections` group. No changes should be needed to this template.

Create new `Section: ...` as required. Sometimes you should also create new `Partial: ...` groups for special components that are repeated in many sections (e.g. custom settings for buttons).

The Dynamic template will read the sections and load the appropriate view under `wp-content/themes/quick-start/sections` based on the layout name.
