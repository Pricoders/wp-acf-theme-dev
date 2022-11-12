<?php

// All additions
require get_template_directory() . '/inc/helpers.php';
require get_template_directory() . '/inc/gutenberg.php';

// Add support for menu setting via admin panel
add_theme_support('menus');

// Add thumbnails support
add_theme_support('post-thumbnails');

//Add theme support for title tag (since wp 4.1)
add_theme_support('title-tag');

//Enable HTML5 markup support
add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

//Enable selective refresh for widgets in customizer
add_theme_support('customize-selective-refresh-widgets');


/**
 * Only show Custom Fields admin page on ":8080" address.
 */
add_filter('acf/settings/show_admin', function () {
    $site_url = get_bloginfo('url');

    if (string_ends_with($site_url, ':8080')) {
        return true;
    } else {
        return false;
    }
});