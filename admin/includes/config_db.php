<?php
function getSchema()
{
  return [
    'galery' => [
      'menuName' => 'Работы',
      'fields'  => [
        'title' => [
          'name' => 'Название',
          'element' => 'input',
          'type' => 'text',
          'required' => false,
        ],

        'tag' => [
          'name' => 'Тег',
          'element' => 'input',
          'type' => 'hidden',
          'data' => ['Разное', 'Кухонные принадлежности', 'Лазерная гравировка и резка', 'Рамки', 'Картины Панно', 'Мебель', 'Религия', 'Сувениры - шкатулки'],
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
