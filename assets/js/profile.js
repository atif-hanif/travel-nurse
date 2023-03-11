$("#select_all_1").change(function(){  //"select all" change 
    $(".checkbox_1").prop('checked', $(this).prop("checked")); //change all ".checkbox" checked status
});

//".checkbox" change 
$('.checkbox_1').change(function(){ 
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if(false == $(this).prop("checked")){ //if this item is unchecked
        $("#select_all_1").prop('checked', false); //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($('.checkbox_1:checked').length == $('.checkbox_1').length ){
        $("#select_all_1").prop('checked', true);
    }
});

$("#select_all_2").change(function(){  //"select all" change 
    $(".checkbox_2").prop('checked', $(this).prop("checked")); //change all ".checkbox" checked status
});

//".checkbox" change 
$('.checkbox_2').change(function(){ 
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if(false == $(this).prop("checked")){ //if this item is unchecked
        $("#select_all_2").prop('checked', false); //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($('.checkbox_2:checked').length == $('.checkbox_2').length ){
        $("#select_all_2").prop('checked', true);
    }
});

$("#select_all_3").change(function(){  //"select all" change 
    $(".checkbox_3").prop('checked', $(this).prop("checked")); //change all ".checkbox" checked status
});

//".checkbox" change 
$('.checkbox_3').change(function(){ 
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if(false == $(this).prop("checked")){ //if this item is unchecked
        $("#select_all_3").prop('checked', false); //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($('.checkbox_3:checked').length == $('.checkbox_3').length ){
        $("#select_all_3").prop('checked', true);
    }
});