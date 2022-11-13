<?php
 /**
 * Determines if string ends with a specific sub string.
 *
 * @param string $haystack The string to search in.
 * @param string $needle The sub-string to search for.
 * @return boolean
 */
function string_ends_with($haystack, $needle) {
    $length = strlen($needle);

    return $length === 0 || (substr($haystack, -$length) === $needle);
}