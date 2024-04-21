function getData(tableName, id) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "admin/includes/CRUD/getDataFromDB.php",
      type: "POST",
      data: {
        id: id,
        tableName: tableName,
      },
      dataType: "json",
      success: function (data) {
        let dataArray = Object.values(data);
        resolve(dataArray);
      },
      error: function (xhr, status, error) {
        console.error("Error:", xhr, status, error);
        reject(error);
      },
    });
  });
}

function stringToImageArray(imageString) {
  return imageString.split(",").map((image) => image.trim());
}

// --------------------------------------------------------------------------------------------------------------------

getData("galery").then((response) => {
  let modal = $(".modal-content").empty();
  let img_index = 1;

  // Функция для вставки изображений в колонки
  function insertImages(response) {

    let block = $(".galery").empty();

    $(".main_column__1").empty();
    $(".main_column__2").empty();
    $(".main_column__3").empty();

    response.forEach((element, index) => {
      const blockIndex = index % 3;
      const tag = element.tag || "all"; // Установка тега по умолчанию, если он не задан
      const imageSrcArray = stringToImageArray(element.img);

      if (imageSrcArray.length > 1) {
        for (let i = 0; i < imageSrcArray.length; i++) {
        //   $(`.main_column__${(i % 3) + 1}`).append(
          block.append(
            `<div class="main_column__item" data-tag="${tag}" onclick="openModal(); currentSlide(${img_index})"><img src="admin/img/${imageSrcArray[i]}" alt=""></div>`
          );

          modal.append(`
              <div class="mySlides">
                  <img src="admin/img/${imageSrcArray[i]}" alt="Фото ${img_index}">
              </div>
            `);
          img_index++;
        }
      } else {
        // $(`.main_column__${blockIndex + 1}`).append(
        block.append(
          `<div class="main_column__item" data-tag="${tag}" onclick="openModal(); currentSlide(${img_index})"><img src="admin/img/${imageSrcArray[0]}" alt=""></div>`
        );

        modal.append(`
            <div class="mySlides">
                <img src="admin/img/${imageSrcArray[0]}" alt="Фото ${img_index}">
            </div>
          `);
        img_index++;
      }
    });
  }

  // Вставка изображений при загрузке страницы
  insertImages(response);

  // Функция для фильтрации изображений по тегам
  function filterImages(selectedTag) {
    $(".main_column__item").each(function () {
      const tag = $(this).attr("data-tag");
      if (selectedTag === "all" || tag === selectedTag) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  // Обработчик события для фильтрации по тегам
  $(".work_filter ul li").click(function () {
    // Удаляем класс activeElement у текущего активного элемента
    $(".work_filter ul li.activeElement").removeClass("activeElement");

    // Добавляем класс activeElement к выбранному элементу списка
    $(this).addClass("activeElement");

    const selectedTag = $(this).text().trim(); // Получаем текст элемента списка
    filterImages(selectedTag);
  });

  // Фильтрация по умолчанию при загрузке страницы
  filterImages("all");
});
