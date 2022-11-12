<?php
/*
  Template Name: Dynamic Template
*/
?>
<?php get_header(); ?>

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

      <?php get_template_part('partials/content', 'sections'); ?>

  	<?php endwhile; endif; ?>


<?php get_footer(); ?>