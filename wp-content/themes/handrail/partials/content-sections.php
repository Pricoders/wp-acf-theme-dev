<?php

if( have_rows('sections') ):

    while ( have_rows('sections') ) : the_row();

        // The loop code
        get_template_part('sections/section', get_row_layout() );

    endwhile;

else :

    // no rows found

endif;