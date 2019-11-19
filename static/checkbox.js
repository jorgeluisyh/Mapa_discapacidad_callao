var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }

$(window).on('pageshow',function(){
      $('#todos').click(function() { $(this.form.elements).filter(':checkbox').prop('checked', this.checked);
        });
    });