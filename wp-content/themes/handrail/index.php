<?php get_header(); ?>

  <!-- Page Content -->
  <div class="container">

    <div class="row">
      <div class="col-md-12 my-5">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

          <h1><?php the_title(); ?></h1>
          <p><?php the_content(); ?></p>

    	<?php endwhile; else : ?>

    	  <p><?php _e( 'Sorry, no results found.'); ?></p>

    	<?php endif; ?>
      </div>
    </div>
    <!-- /.row -->
  </div>
  <!-- /.container -->

  <?php get_footer(); ?>