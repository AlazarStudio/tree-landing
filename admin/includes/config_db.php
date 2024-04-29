<?php
function getSchema()
{
  return [
    'tags' => [
      'menuName' => 'Теги',
      'fields' => [
        'title' => [
          'name' => 'Название',
          'element' => 'input',
          'type' => 'text',
          'required' => true,
        ],
      ],
    ],

    'galery' => [
      'menuName' => 'Работы',
      'fields'  => [
        'title' => [
          'name' => 'Название',
          'element' => 'input',
          'type' => 'text',
          'required' => false,
        ],

        'text' => [
          'name' => 'Описание',
          'element' => 'input',
          'type' => 'text',
          'required' => false,
        ],
        

        'tag' => [
          'name' => 'Тег',
          'element' => 'input',
          'type' => 'hidden',
          'data' => 'tags',
          'selectOne' => true,
          'required' => true,
        ],

        'img' => [
          'name' => 'Картинки',
          'element' => 'input',
          'type' => 'file',
          'required' => true,
        ],
      ],
    ],
    
  ];
}
