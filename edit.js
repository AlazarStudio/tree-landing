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

getData("tags").then((response) => {
  let filter = $(".work_filter__tags");
  response.forEach((tag) => {
    //console.log(tag);
    filter.append(`
      <li data-tag="${tag.title}">${tag.title}</li> 
    `);
  });
});

getData("galery").then((response) => {
  let modal = $(".modal-content").empty();
  let img_index = 1;

  function insertImages(response) {
    let block = $(".gallery").empty();

    let imgMass = [];

    response.forEach((element, index) => {
      const blockIndex = index % 3;
      const tag = element.tag || "all";
      const imageSrcArray = stringToImageArray(element.img);

      if (imageSrcArray.length > 1) {
        for (let i = 0; i < imageSrcArray.length; i++) {
          block.append(
            `<div class="gallery_img" data-tag="${tag}" onclick="openModal(${imgMass}); currentSlide(${img_index})"><img src="admin/img/${imageSrcArray[i]}" alt=""></div>`
          );

          modal.append(`
              <div class="mySlides" data-tag="${tag}">
                  <img src="admin/img/${imageSrcArray[i]}" alt="Фото ${img_index}">
              </div>
            `);
          img_index++;
        }
      } else {
        block.append(
          `<div class="gallery_img" data-tag="${tag}" onclick="openModal(); currentSlide(${img_index})"><img src="admin/img/${imageSrcArray[0]}" alt=""></div>`
        );

        modal.append(`
            <div class="mySlides" data-tag="${tag}">
              <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <img src="admin/img/${imageSrcArray[0]}" alt="Фото ${img_index}">
                <span style="position: absolute; color: white; background-color: #7171719c; width: 100%; bottom: 0; padding: 8px;">${element.text}</span>
              </div>
            </div>
          `);
        img_index++;
      }
    });
  }

  insertImages(response);

  function filterImages(selectedTag) {
    $(".gallery_img").each(function () {
      const tag = $(this).attr("data-tag");

      if (selectedTag === "all" || tag === selectedTag) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  $(".work_filter__tags").on("click", "li", function () {
    let img_index1 = 1;
    let modal = $(".modal-content").empty();
    let block = $(".gallery").empty();

    const selectedTag = $(this).attr("data-tag");

    response.forEach((element, index) => {
      const imageSrcArray = stringToImageArray(element.img);

      if (selectedTag == element.tag || selectedTag == 'all') {
        block.append(
          `<div class="gallery_img" data-tag="${element.tag}" onclick="openModal(); currentSlide(${img_index1})"><img src="admin/img/${imageSrcArray[0]}" alt=""></div>`
        );

        modal.append(`
          <div class="mySlides" data-tag="${element.tag}">
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <img src="admin/img/${imageSrcArray[0]}" alt="Фото ${img_index1}">
              <span style="position: absolute; color: white; background-color: #7171719c; width: 100%; bottom: 0; padding: 8px;">${element.text}</span>
            </div>
          </div>
        `);
        img_index1++;
      }
    });

    $(".work_filter__tags li.activeElement").removeClass("activeElement");
    $(this).addClass("activeElement");

    filterImages(selectedTag);
  });

  filterImages("all");
});
