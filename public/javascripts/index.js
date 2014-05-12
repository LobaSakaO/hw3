(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text" placeholder="New task..."><span class="text"></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');              // done <ul>


setAddButton();	// 點擊按鈕時，插入新項目

mainUl.sortable({
    connectWith: connected,
    tolerance: 'pointer', 
    start: function (event, ui) { placeholder.addClass(   'is-dragging'); },
    stop : function (event, ui) { placeholder.removeClass('is-dragging'); }
});

doneUl.sortable({
    receive: function (event, ui) 
    {
      console.log("done receive~~~~~");
      ui.item.addClass('is-done');
      mainUl.append(ui.item);
    }
});

deleteUl.sortable({
    receive: function (event, ui) 
    {
      console.log("delete receive~~~~~");
      ui.item.remove();
    }
});

setEnterAndSave();	// 按 Enter 鍵時完成編輯並存檔

loadAll();




///////////////////////////////////////////////////////

function setAddButton(){

  addButton.disableSelection();

	// 點擊按鈕時，插入新項目
	addButton.click(function(){
		$(tmpl).prependTo(mainUl).addClass('is-editing').find('input').focus();
	});
}


function setEnterAndSave(){
	// 按 Enter 鍵時完成編輯並存檔
	mainUl.on('keyup', 'input', function(e){
		if(e.which ===13)
		{
      console.log('pressing enter');
			var input = $(this);
			var li    = input.parents('li');
			li.find('span').text(input.val());

			li.removeClass('is-editing');
      createAnItem(li);
		}
		
	});
}

function loadAll(){
  $.get('http://localhost:5000/items', {}, 
    function(data, status)
    { 
      console.log(JSON.parse(data));
      var arr = data, i;

      // 對於陣列裡的每一個項目，插入回 ul 裡。
      for(i=0; i<arr.length; i+=1)
      {
        if(arr[i]['done']===true)
          $(tmpl).clone().appendTo(mainUl).addClass('is-done').find('span').text(arr[i]['text']);
        else
          $(tmpl).clone().appendTo(mainUl).find('span').text(arr[i]['text']);

      }

    }, 'json');
}

function createAnItem(item){
  var text = item.find('span').text();
  console.log(text);

  console.log('posting');
  $.post('http://localhost:5000/items', {done: false, text: text}, function(data, status){
  
    console.log('status', status);
  
  }, 'json');

}

// function saveToServer(){
//   var obj = [];

//   // 對於每個 li，
//   // 把 <span> 裡的文字放進陣列裡
//   // mainUl.find('span').each(function(){
//   //   arr.push($(this).text());
//   // });

//   mainUl.find('li').each(function(){

//     if ($(this).find('span').text()===""){}

//     else if($(this).hasClass('is-done'))
//     {
//       var todo = {done: true, text: $(this).find('span').text()};
//       obj.push(todo);
//     }
//     else
//     {
//       var todo = {done: false, text: $(this).find('span').text()};
//       obj.push(todo);
//     }
//     $.getJSON('http://localhost:5000/',{},function(data, status){
//       console.log('post!!');
//     });
  
//   });

// }


}());
