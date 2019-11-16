let checkboxStates


function querycolor(field){
  if (field==0){
    return 'gray'
  }else if(field < 30){
    return 'rgb(255,255,0)';
  }else if(field < 60){
    return 'rgb(255,189,0)';
  }else if(field < 100){
    return 'rgb(255,136,0)';
  }else if(field < 150){
    return 'rgb(179,93,5)'
  }else if(field <526){
    return 'rgb(177,0,0)';
  }
}

      function ShapeStyle(feature){

        return{
          fillColor :querycolor(feature.properties.discapac),
          weight: 0,
          opacity: 1,
          color : 'white',
          dashArray: 3,
          fillOpacity: 0.6,         
        }}


      function mostrar(feature, layer) {
                var props = feature.properties;
                var content = `<p> Discapacidad Total = ${props.discapac}</br>
                              hombres = ${props.dishom}</br>
                              mujeres = ${props.dismuj}</p>`
                <!--var content = `<img width="300" src="${props.picture_url}"/><h3>${props.title}</h3><p>${props.description}</p>`;-->
                layer.bindPopup(content);
            }


      function ShapeStyle(feature){

        return{
          fillColor :querycolor(feature.properties.discapac),
          weight: 0,
          opacity: 1,
          color : 'white',
          dashArray: 3,
          fillOpacity: 0.8,         
        }}
      function ShapeStyleHom(feature){

              return{
                fillColor :querycolor(feature.properties.dishom),
                weight: 0,
                opacity: 1,
                color : 'white',
                dashArray: 3,
                fillOpacity: 0.8,         
              }}
      function ShapeStyleMuj(feature){

              return{
                fillColor :querycolor(feature.properties.dismuj),
                weight: 0,
                opacity: 1,
                color : 'white',
                dashArray: 3,
                fillOpacity: 0.8,         
              }}

      function filterDistrito(feature){
              const isDistChecked = checkboxStates.fdistrito.includes(feature.properties.UBIGEO)
              return isDistChecked && true
      }


      
      // var dataurl = '{% url "data" %}';
      var dataurl = dataurl;
      var infoinner = `
                      <div id = "filtro" class="filtros"><h3 class="texto">Filtro por distrito:</h3></div>
                      <form>
                       <div class="multiselect">
                       <div class="selectBox" onclick="showCheckboxes()">
                        <select>
                          <option>Seleccione un distrito</option>
                        </select>
                        <div class="overSelect"></div>
                        </div>
                        <div id="checkboxes">
                        <input type="checkbox" id="cero" class="todos"/>Todos los checkbox</br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070101">CALLAO    </br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070102">BELLAVISTA</br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070103">CARMEN LR </br>
                        </div>
                        </div>
                        </form>
                        `;

      


      window.addEventListener("map:init", function (event) {
        var map = event.detail.map;
        
         var info = L.control({
            position: 'topleft'
        });

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;};
        info.update = function (props) {

            this._div.innerHTML = infoinner;
            
        };
// var controlLayer =map.layerscontrol;
        info.addTo(map);


        var controlLayer =L.control.layers(null, null, {collapsed:false}).addTo(map);
        controlLayer.setPosition('bottomright')
        // Download GeoJSON data with Ajax
        fetch(dataurl)
          .then(function(resp) {
            return resp.json();
          })
          .then(function(data) {  



          var discapTotal = L.geoJson(null, {
              style: ShapeStyle,
              onEachFeature: mostrar,
              filter: filterDistrito
                            }).addTo(map);

          controlLayer.addBaseLayer(discapTotal,'Discapacidad Total');
       
          var discapHombres = L.geoJson(null, {
              style: ShapeStyleHom,
              onEachFeature: mostrar,
              filter: filterDistrito
                            });

          controlLayer.addBaseLayer(discapHombres,'Discapacidad Hombres');
       
          var discapMujeres = L.geoJson(null, {
              style: ShapeStyleMuj,
              onEachFeature: mostrar,
              filter: filterDistrito
                            });

          var overlayMaps = {
                              "Discapacidad Total": discapTotal,
                              "Discapacidad Hombres": discapHombres,
                              "Discapacidad Mujeres": discapMujeres
            };


          // addOverlay   
          controlLayer.addBaseLayer(discapMujeres,'Discapacidad Mujeres');

          function updateCheckboxStates() {
                  checkboxStates = {
                    fdistrito: []
                  }
                  
                  for (let input of document.querySelectorAll('input')) {
                    if(input.checked) {
                      switch (input.className) {
                        case 'fdistrito': checkboxStates.fdistrito.push(input.value); break
                      }
                    }
                  }
                }


            for (let input of document.querySelectorAll('input')) {
              //Listen to 'change' event of all inputs
              input.onchange = (e) => {
                discapTotal.clearLayers()
                discapHombres.clearLayers()
                discapMujeres.clearLayers()
                updateCheckboxStates()
                discapTotal.addData(data)   
                discapHombres.addData(data)   
                discapMujeres.addData(data)
              }
            }


                /****** INIT ******/
                updateCheckboxStates()
                discapTotal.addData(data)
                discapHombres.addData(data)
                discapMujeres.addData(data)
          });
      

          var legend = L.control({position: 'bottomleft'});
          legend.onAdd = function(map){
            var el_label = L.DomUtil.create('div','leyenda');
            var labels = [
              "151&nbsp&nbsp;-&nbsp&nbsp&nbsp&nbsp;526",
              "101&nbsp&nbsp;-&nbsp&nbsp&nbsp&nbsp;150",
              "&nbsp&nbsp61&nbsp&nbsp;-&nbsp&nbsp&nbsp&nbsp;100",
              "&nbsp&nbsp31&nbsp&nbsp;-&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;60",
              "&nbsp&nbsp&nbsp&nbsp1&nbsp&nbsp;-&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;30",
              "&nbsp&nbsp&nbsp&nbsp;0"
            ];
            var grades = [525,149,99,59,29,0];
            el_label.innerHTML = '<div><b><CENTER>Leyenda</CENTER></b></div>';
            el_label.innerHTML += '<div><b>Población</b></div>';
            for(var i=0; i< grades.length; i++){
              el_label.innerHTML += '<z style="background:'  
              + querycolor(grades[i])+'">&nbsp;&nbsp;</z>&nbsp;&nbsp;'
              + labels[i] + '<br/>';
            }
            el_label.innerHTML += '<div class = "fuente"><p>Fuente: Instituto Nacional de Estadística e Informática</br> - Censos Nacionales de Población y Vivienda 2017</p></div>';
            return el_label;
          }
          legend.addTo(map);

      });

