let checkboxStates
var mujeres = 100;
var hombres = 100;


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
                        <input type="checkbox" id="todos" class="fdistrito" checked >Todos</br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070101" checked >CALLAO    </br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070102" checked >BELLAVISTA</br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070103" checked >CARMEN LR </br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070104" checked >LA PERLA </br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070105" checked >LA PUNTA</br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070106" checked >VENTANILLA</br>
                        <input type="checkbox" name="distrito" class="fdistrito" value="070107" checked >MI PERU</br>
                        </div>
                        </div>
                        </form>
                        `;

      


      window.addEventListener("map:init", function (event) {
        var map = event.detail.map;

        new L.HistoryControl({
            position: 'topright',
            backText: 'Prev',
            forwardText: 'Next'
                }).addTo(map);

        function locateBounds () {
          var p1 = L.latLng(-11.817 , -77.187),
              p2 = L.latLng(-12.081 , -77.063),
              bounds = L.bounds(p1, p2);
             // geolocate
             // ...
             return L.latLngBounds(p1, p2);
             // return bounds;
        }

        new L.Control.ResetView(locateBounds).addTo(map);


        
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


        var dashboard = L.control({
          position: 'topleft'
        });

        dashboard.onAdd = function(map){
          this._div = L.DomUtil.create('div','dashboard');
          this.update();
          return this._div;};

        dashboard.update = function (props) {
            this._div.innerHTML = `<div id="container" style="min-width: 310px; height: 200px; max-width: 600px; margin: 0 auto"></div>`;            
        };

        dashboard.addTo(map);



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

          // var overlayMaps = {
          //                     "Discapacidad Total": discapTotal,
          //                     "Discapacidad Hombres": discapHombres,
          //                     "Discapacidad Mujeres": discapMujeres
          //   };


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


            for (let input of document.querySelectorAll('.fdistrito')) {
              //Listen to 'change' event of all inputs
              input.onchange = (e) => {
                discapTotal.clearLayers()
                discapHombres.clearLayers()
                discapMujeres.clearLayers()
                updateCheckboxStates()
                discapTotal.addData(data)   
                discapHombres.addData(data)   
                discapMujeres.addData(data)
                map.flyToBounds(discapTotal.getBounds());  
                mujeres = fxdashM(data);
                hombres = fxdashH(data);
                chart1 = $('#container').highcharts()
                chart1.series[0].update({
                  data: [
                      ['Mujeres ♀', mujeres],
                      ['Hombres ♂', hombres],
                      {
                        name: 'Other',
                        y: 0,
                        dataLabels: {
                          enabled: false
                        }
                      }
                    ]
                }, false);
                chart1.redraw();           
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



$(window).on('pageshow',function(){
  Highcharts.setOptions({
    colors: ['#f183b4', '#0d70b1']
  });

  Highcharts.chart('container', {
    chart: {
      backgroundColor : null,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Discapacidad<br>por<br>género',
      align: 'center',
      verticalAlign: 'middle',
      y: 50
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -35,
          style: {
            fontWeight: 'bold',
            fontSize : 10,
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '170%'
      }
    },
    series: [{
      type: 'pie',
      name: 'discapacidad',
      innerSize: '50%',
      data: [
        ['Mujeres ♀', mujeres],
        ['Hombres ♂', hombres],
        {
          name: 'Other',
          y: 0,
          dataLabels: {
            enabled: false
          }
        }
      ]
    }]
  });



      });



fxdashM = function(data){
  // var obj = JSON.parse(data);
  var obj = data.features;
  var datos = Object.values(obj);
  var datos = datos.filter(filterDistrito)
  var sum = Object.values(datos).reduce((acc, current) => acc + current.properties.dismuj, 0);
  return sum;
}
fxdashH = function(data){
  // var obj = JSON.parse(data);
  var obj = data.features;
  var datos = Object.values(obj);
  var datos = datos.filter(filterDistrito)
  var sum = Object.values(datos).reduce((acc, current) => acc + current.properties.dishom, 0);
  return sum;
}