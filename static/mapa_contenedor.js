
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


      
      var dataurl = '{% url "data" %}';

      


      window.addEventListener("map:init", function (event) {
        var map = event.detail.map;
        // var controlLayer =map.layerscontrol;
        var controlLayer =L.control.layers(null, null, {collapsed:false}).addTo(map);
        controlLayer.setPosition('bottomright')
        // Download GeoJSON data with Ajax
        fetch(dataurl)
          .then(function(resp) {
            return resp.json();
          })
          .then(function(data) {          

          var discapTotal = L.geoJson(data, {
              style: ShapeStyle,
              onEachFeature: mostrar
                            }).addTo(map);

          controlLayer.addOverlay(discapTotal,'Discapacidad Total');
       
          var discapHombres = L.geoJson(data, {
              style: ShapeStyleHom,
              onEachFeature: mostrar
                            });

          controlLayer.addOverlay(discapHombres,'Discapacidad Hombres');
       
          var discapMujeres = L.geoJson(data, {
              style: ShapeStyleMuj,
              onEachFeature: mostrar
                            });

          controlLayer.addOverlay(discapMujeres,'Discapacidad Mujeres');
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