<?php

/**
 * Implements hook_block_view_alter().
 */
function alkaline_block_view_alter(&$data, $block) {
  // add icons to contact info
  if ($block->module == 'contact_info' && $block->delta == 'contact_details') {
    $items = &$data['content']['items'];
    if (isset($items['phone']))   $items['phone']['#prefix']   .= alkaline_icon('phone');
    if (isset($items['fax']))     $items['fax']['#prefix']     .= alkaline_icon('phone');
    if (isset($items['address'])) $items['address']['#prefix'] .= alkaline_icon('map-marker');
  }
}

/**
 * Implements hook_form_alter().
 */
function alkaline_form_alter(&$form, $form_state, $form_id) {
  // add form delta to classes
  $form['#attributes']['class'][] = str_replace('-form', '', $form['#id']);

  if ($form_id == 'contact_site_form') {
    $form['name']['#title'] = t('Name');
    $form['mail']['#title'] = t('E-mail');
  }
  if (strpos($form_id, 'commerce_cart_add_to_cart_form_') === 0) {
    $form['quantity']['#attributes']['placeholder'] = 'Qty';
  }
  if ($form_id == 'commerce_checkout_form_checkout') {
    foreach(['shipping', 'billing'] as $profile_type) {
      $street_block = &$form['customer_profile_'.$profile_type]['commerce_customer_address'][LANGUAGE_NONE][0]['street_block'];
      $street_block['thoroughfare']['#title'] = 'Address';
      $street_block['premise']['#title'] = '';
    }
  }
  if ($form_id == 'user_login_block') {
    $form['name']['#attributes']['placeholder'] = 'Email';
    $form['pass']['#attributes']['placeholder'] = 'Password';
  }
}

/**
 * Generates SVG icon markup
 */
function alkaline_icon($name) {
  return '<svg class="icon"><use xlink:href="#' . $name . '" /></svg>';
}

/**
 * Implements hook_mail_alter().
 */
function alkaline_mail_alter(&$message) {
  if ($message['id'] == 'contact_page_mail') {
    $params = $message['params'];
    $message['subject'] = 'Enquiry: ' . str_replace(array('[',']'),'',$message['subject']);

    $message['body'] = '<table>'
      . alkaline_format_mail_field('Name', $params['name'])
      . alkaline_format_mail_field('Organisation', $params['organisation'])
      . alkaline_format_mail_field('Phone', $params['phone'])
      . alkaline_format_mail_field('Email', $params['mail'])
      . alkaline_format_mail_field('Message', $params['message'])
      . '</table>';
  }
}

/**
 * Format each field as a table row
 */
function alkaline_format_mail_field($label, $value) {
  return '<tr><th>' . $label . '</th><td>' . $value .'</td></tr>';
}

/**
 * Implements template_preprocess()
 */
function alkaline_preprocess(&$vars, $hook) {
  if (isset($vars['elements']['#entity_type'])) {
    alkaline_preprocess_entity($vars, $vars['elements']['#entity_type']);
    $function = __FUNCTION__ . '_' . $vars['elements']['#entity_type'];
    if (function_exists($function)) {
      $function($vars, $hook);
    }
  }
}

/**
 * 
 */
function alkaline_preprocess_entity(&$vars, $entity_type) {
  // add entity_type to classes
  $vars['classes_array'][] = str_replace('_', '-', $entity_type);
}

/**
 * Implements template_preprocess_html()
 */
function alkaline_preprocess_html(&$vars) {
  $vars['favicon_dir'] = url(drupal_get_path('theme', 'alkaline') . '/favicon');
  $vars['favicons']    = theme_render_template(drupal_get_path('theme', 'alkaline') . '/templates/favicon.tpl.php', $vars);
  $vars['icons']       = theme_render_template(drupal_get_path('theme', 'alkaline') . '/icons/fa-solid.svg', $vars);
}

/**
 * Preprocessor for commerce_checkout_form_checkout theme.
 */
function alkaline_preprocess_commerce_checkout_form_review(&$vars) {
  //dsm($vars);
}

/**
 * Implements template_preprocess_commerce_price()
 */
function alkaline_preprocess_commerce_price(&$vars) {
  for ($i = 0; $i < count($vars['items']); $i++) {
    $vars['items'][$i]['#prefix'] = '<p class="price">';
    $vars['items'][$i]['#suffix'] = '</p>';
  }
}

/**
 * Custom preprocess function
 */
function alkaline_preprocess_commerce_order(&$vars) {
  // hide the billing address since it is unused
  if (isset($vars['content']['commerce_customer_billing'])) {
    unset($vars['content']['commerce_customer_billing']);
  }
}

/**
 * Implements template_preprocess_node()
 */
function alkaline_preprocess_node(&$vars) {
}

/**
 * 
 */
function alkaline_preprocess_node_product_group(&$vars) {
  if ($vars['view_mode'] == 'full') {
    // add all the extra JS this node needs
    drupal_add_js(drupal_get_path('theme', 'alkaline') . '/js/lightbox.js');
    drupal_add_js(drupal_get_path('theme', 'alkaline') . '/js/tabs.js');
    drupal_add_js(drupal_get_path('theme', 'alkaline') . '/js/productThumbs.js');
    $vars['view_product_displays'] = views_embed_view('product_displays', 'default', $vars['node']->nid);
  }
  else if ($vars['view_mode'] == 'teaser') {
    if(isset($vars['content']['field_product_images'][0])){
      $img_src = image_style_url('large', $vars['content']['field_product_images'][0]['#item']['uri']);
      $vars['image'] = '<img src="' . $img_src . '" alt="' . $vars['title'] . '" />';
    }
  }
}

/**
 * Implements template_preprocess_page()
 */
function alkaline_preprocess_page(&$vars) {
  // set an SVG logo
  $vars['logo'] = str_replace('png', 'svg', $vars['logo']);
    
  // Remove no_content variable to just leave the content layer empty
  if(isset($vars['page']['content']['system_main']['default_message']))
    unset($vars['page']['content']['system_main']['default_message']);

  // Set a custom page title for the Admin login page
  if(drupal_get_title() == 'Access Denied / User log in')
    drupal_set_title('Log in');

  // Set a custom page title for the User page
  if (request_path() == 'user')
    drupal_set_title('Dashboard: ' . drupal_get_title());
  
  $templates_path = drupal_get_path('theme', 'alkaline') . '/templates/';
  
  // if commerce cart is enabled, get the number of items in the cart
  if (function_exists('commerce_cart_order_load')) {
    global $user; // the logged-in user
    $vars['cart_items'] = 0;

    // Load cart order and count the items in it
    if ($order = commerce_cart_order_load($user->uid)) {
      $order_wrapper = entity_metadata_wrapper('commerce_order', $order);

      // Loop over line items and increment product counter
      foreach ($order_wrapper->commerce_line_items as $delta => $line_item_wrapper) {
        // If line item is a commerce product type
        if (in_array($line_item_wrapper->type->value(), commerce_product_line_item_types())) {
          // Increment counter
          $vars['cart_items']++;   
        }
      }
    }

    // render cart menu if there are item in the cart
    if ($vars['cart_items'] > 0)
      $vars['cart_menu'] = theme_render_template($templates_path . '/block/' . 'block--cart-menu.tpl.php', $vars);
  }

  // render layers
  //$includes_path = drupal_get_path('theme', 'alkaline') . '/templates/includes/';
  // $vars['layers']['navbar'] = theme_render_template($includes_path . 'navbar.tpl.php', $vars);
  // $vars['layers']['footer'] = theme_render_template($includes_path . 'footer.tpl.php', $vars);
}


/**
 * Implements template_preprocess_taxonomy_term()
 */
function alkaline_preprocess_taxonomy_term(&$vars) {
	// Define template to use for teaser view mode
  $vocabulary = taxonomy_vocabulary_load($vars['term']->vid);
  $vars['theme_hook_suggestions'][] = 'taxonomy_term__' . $vocabulary->machine_name . '__' . $vars['view_mode'];   
  $vars['theme_hook_suggestions'][] = 'taxonomy_term__' . $vars['term']->tid . '__' . $vars['view_mode'];
  
  // Get the entity metadata wrapper for the term
  $vars['entity'] = entity_metadata_wrapper('taxonomy_term', $vars['term']->tid);
  
  // call the vocabulary-specific preprocessor
  $vocabulary_preprocessor = __FUNCTION__ . '_' . $vocabulary->machine_name;
  if (function_exists($vocabulary_preprocessor)) {
    $vocabulary_preprocessor($vars);
  }
}

/**
 * Implements template_preprocess_field()
 */
function alkaline_preprocess_field(&$vars) {
  // call the name-specific preprocessor
  $field_name_preprocessor = __FUNCTION__ . '_' . $vars['element']['#field_name'];
  if (function_exists($field_name_preprocessor)) {
    $field_name_preprocessor($vars);
  }
}

/**
 * Implements template_preprocess_user_profile()
 */
function alkaline_preprocess_user_profile(&$vars) {
  $vars['classes_array'][] = 'user-profile';
}

/**
 * Implements template_preprocess_views_view()
 */
function alkaline_preprocess_views_view(&$vars) {  
  // add view name to classes
  $vars['classes_array'][] = str_replace('_', '-', $vars['view']->name);
}

/**
 * Implements hook_theme().
 */
function alkaline_theme($existing, $type, $theme, $path) {
  return array(
    'commerce_checkout_review' => array(
      'render element' => 'form',
      'template' => 'form--commerce-checkout-review',
      'path' => $path . '/templates/form',
    ),
  );
}

/**
 * Disables unwanted module stylesheets
 * 
 * @param unknown $css
 */
function alkaline_css_alter(&$css) {
  
  $files = array(
    array( 'addressfield',      '/addressfield.css' ),
    array( 'ctools',            '/css/ctools.css' ),
    array( 'field',             '/theme/field.css' ),
    array( 'logintoboggan',     '/logintoboggan.css' ),
    array( 'node',              '/node.css' ),
    array( 'search',            '/search.css' ),
    array( 'system',            '/system.menus.css' ),
    array( 'system',            '/system.admin.css' ),
    array( 'system',            '/system.base.css' ),
    array( 'system',            '/system.maintenance.css' ),
    array( 'system',            '/system.messages.css' ),
    array( 'system',            '/system.theme.css' ),
    array( 'user',              '/user.css' ),
    array( 'views',             '/css/views.css' ),
    array( 'commerce_cart',      '/theme/commerce_cart.theme.css' ),
    array( 'commerce_checkout',  '/theme/commerce_checkout.base.css' ),
    array( 'commerce_checkout',  '/theme/commerce_checkout.theme.css' ),
    array( 'commerce_customer',  '/theme/commerce_customer.theme.css' ),
    array( 'commerce_line_item', '/theme/commerce_line_item.theme.css' ),
    array( 'commerce_order',     '/theme/commerce_order.theme.css' ),
    array( 'commerce_payment',   '/theme/commerce_payment.theme.css' ),
    array( 'commerce_price',     '/theme/commerce_price.theme.css' ),
    array( 'commerce_product',   '/theme/commerce_product.theme.css' ),
    array( 'commerce_tax',       '/theme/commerce_tax.theme.css' ),
  );

  foreach ($files as $file)
    if (module_exists($file[0]))
      unset( $css[ drupal_get_path('module', $file[0]) . $file[1] ] );
}
