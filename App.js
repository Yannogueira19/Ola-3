import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';


const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular
  });
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [yearRange, setYearRange] = useState([1978, 2012]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);

  

    const cars = [
      {
        id: 1,
        name: 'VW - Fusca',
        year: 1978,
        color: 'Amarelo',
        image: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202409/20240908/volkswagen-fusca-1.3-l-8v-gasolina-2p-manual-wmimagem12410505925.jpg?s=fill&w=1920&h=1440&q=75',
        value: 'R$ 36.000',
        KM: '133.000',
        exchange: 'Manual',
        fuel: 'Gasolina',
        description: 'O Volkswagen Fusca, ícone automotivo no Brasil, é famoso por sua forma arredondada semelhante a um besouro. Caracteriza-se pelo motor traseiro refrigerado a ar, design simples e durável, e espaço para quatro passageiros. Com seus faróis redondos e excelente economia de combustível, o Fusca ganhou popularidade por sua confiabilidade e facilidade de manutenção. Produzido no Brasil até 1996, tornou-se símbolo de acessibilidade, permitindo que muitas famílias adquirissem seu primeiro carro. Sua influência vai além do transporte, marcando gerações e se tornando parte da cultura brasileira.',
        creators: [
          { name: 'Ferdinand Porsche', secondname: 'Renault', secondrole: 'Fabricante', role: 'Designer', gender: 'Masculino', birthDate: '03-09-1875', birthPlace: 'Maffersdorf, Império Austro-Húngaro', Resume: 'Ferdinand Porsche (1875–1951) foi um engenheiro automotivo austríaco conhecido por fundar a Porsche AG e projetar o Volkswagen Fusca, um dos carros mais populares da história. Também trabalhou em projetos militares, incluindo o tanque Tiger durante a Segunda Guerra Mundial.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ferdinand_Porsche.jpg/300px-Ferdinand_Porsche.jpg', secondimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDXBLMTY3kYQsZJ71Jbc9S1cGOkOol9vRLw&s', },
          { name: 'Volkswagen',  secondname: 'Peugeot', secondrole:'Fabricante', role: 'Fabricante', date: '28 de maio de 1937', origin:'Alemanha', text:'A Volkswagen é uma fabricante de automóveis alemã fundada em 1937 e uma das maiores do mundo. É conhecida por modelos icônicos como o Fusca e o Golf. A empresa faz parte do Grupo Volkswagen, que inclui marcas como Audi, Porsche e Lamborghini. A Volkswagen também investe fortemente em veículos elétricos e tecnologia de ponta.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAdVBMVEX///8AHlAAAD0AAEYAEksAGE0AAEEAAD8AG08AAEMAFUwAADsADEnc3eEAEEoACUgAADfLzNNbYXtpboX29vfs7O8rNl03QGQ/R2gyO2C2uMKHi5xGTWxSWHWkprKSlaR4fZKanashLVetr7oVJVPCw8sAAC7B/5l/AAAEAklEQVRIiY2W26KjIAxFQUREVFS0rfXa2/z/J05QEdCeM8NLrRhWSHYCCH0bdTl2auj7Qc1jWX/95MvIpkvBCSfLgIfiOWX/YXa/CpmTqLiouetmdRWM5FJcXv8yw5zisB8dRDYOIaY8/820uTGKcfw+vm/126j90eGxSFKeYMzv/vsPw5gSSYvHdzvFYjGjPsG09SfgFXjRiTiqvtndSELKdXlWuhNZAE6M8EtzeTnnpk3T9e0TouOtrHIc8xVNwufR8pbKfn16cYyDxs404ILs1ueK5JfD/kjem+c0xulspyZYSJiFKiI9b14BfdovCcaR9UjGOFf7vz6PnNg2EDDrXA3BIPus9lw4GaRxYf/1Cf84/DnFMTV/LhQngzOZRTZbn8AXSyasCMpTdnoaGfVBAiKXiCoQ53V9HEAPXiAhq3G+ASN8EEsJuwzK7bODAmFRzF/bDjG44yGvRgQKtpsct7H50BQ4xbtr67hvIqiZG2ADTNcwPwjvyDECeBXBIaUrMO2knLSnIdbhoTfXcAQLXqPcF9EKZKhKtVyKtEP36ICseYzJeHfVZoBkQi9S1JBQnXxAJh6ykxCEd3wolAUINoyXYM1gzROygTzARnHg9osNiJAgI5pkod+dkAoWx4edb0BIF5m1MPW7EzIrKIzATe8ixaUyFVFIyXVRjeydr5C6tG3rytsC0UwGVMl18oQ8DQtEHel3wxMy08PNhQUuhsbVBRlYZPOHMRZEPtD0Hu3qnJqa9ZFLIk0dHIDQepRJxwkJasNuublA9IanO2EmxyCUvUtotSW5Ey8NDIzeCxAASO7ufGyUctWtZs53yemK3oFgU2qRz8Ydi9SOsVLrbutwHvChRQ5lFRpDi4S2r8scdLcu6wHRbennI7F51+Wgkbrt64Dq75dC9oCNWAq5cXw1SKj8tZXdkqV1+MCJr/4PoahdZKXb9Vo+ugPG+ABEMlkbVMnsYstRlemGubUaWCn6+MCRR1seWmr7wxLYnu6tZuRQk1XithBOTd8vhW0QGplQ55yB5kPBTu5xmCXbO3QV2uf3IjV7zqyatUdtKZxOUbOYmQmNdCtTZ8YBQvsrnFq7i91v3Yu9owS04OywTZh3U5p5aM4AjXTPGR3SPdODJAp5Y+CpcR3H9ljVAw4lAxxIekOH0fP83WxI/5z5sA1YtzJtj3aaSbfY5oV/mXn/WVYseUJOPD1mETOlTbKPP7H8r5WIA/XNDmLL8jyYvs89ojQUP94860pQwrrT9TLrIkKDvvlms42yZWEaPLvP/lFTTk8hw+j5+cVsMR0KuEvzQFwGpao2CDjctIv+X2YLYxyKiHAJ13kuJVzP+8dvTvojuz9mVVVqnu4/XKj/Arn4Qg/hZzpHAAAAAElFTkSuQmCC', secondimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7MiVI1GCGLDNBzSK6u2e1NIttIGTBU7kDg&s', },
          
        ],
        version: [
          {name: 'Fusca 1 100 E', year: '1945', image: 'https://autoentusiastas.com.br/ae/wp-content/uploads/2018/05/AG-137-Foto-00a.jpg'},
          {name: 'Fusca 1 200 SR', year: '1958', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm2jn-qItyyThCgbYjyVerL1nuT9pMm4Cxyg&s'},
          {name: 'Fusca 1 500 STD', year: '1970', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SH82f8vMhk3MzT-U6KTL_XzraBNDDUyH5w&s'},
        ],
      },
      {
        id: 2,
        name: 'VW - Gol',
        year: 2010,
        color: 'Branco',
        image: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202501/20250109/volkswagen-gol-1.0-mi-8v-flex-4p-manual-g.v-wmimagem16322393262.jpg?s=fill&w=552&h=414&q=60',
        value: 'R$ 20.990',
        KM: '586.067',
        exchange: 'Manual',
        fuel: 'Gasolina e álcool',
        description: 'O Volkswagen Gol, um dos carros mais vendidos na história do Brasil, é conhecido por sua versatilidade e praticidade. Lançado em 1980 como sucessor do Fusca, o Gol se destaca por seu design compacto e moderno, com linhas mais retas e aerodinâmicas. Equipado com motor dianteiro e tração dianteira, oferece boa dirigibilidade e economia de combustível. O Gol é apreciado por seu interior espaçoso para um carro compacto, conforto razoável e baixo custo de manutenção. Ao longo de suas várias gerações, evoluiu em termos de tecnologia e segurança, mantendo-se como uma opção popular para famílias e jovens motoristas. Sua robustez e adaptabilidade às condições das estradas brasileiras contribuíram para seu sucesso duradouro no mercado automobilístico nacional.',
        creators: [
          { name: 'Luiz Alberto Veiga', role: 'Designer', secondname: 'Hyundai', secondrole: 'Fabricante', gender:'Masculino',  birthDate: '05-06-1953', birthPlace: 'São Paulo, Brasil', Resume: 'Luiz Alberto Veiga (nascido em 1953, São Paulo) é um designer brasileiro conhecido por seu trabalho na Volkswagen, onde projetou carros icônicos como o Volkswagen Gol e o Fox. Ele é renomado por sua inovação e impacto na indústria automotiva.', image: 'https://autoentusiastas.com.br/ae/wp-content/uploads/2018/12/LuizAlbertoVeiga-46-160x160.jpg', secondimage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdhLmdOrerhIByifpFFC0nNeeQIoP2Bpq-Ww&s', },
          { name: 'Volkswagen', role: 'Fabricante', secondname:'Lamborghini', secondrole:'Fabricante',  date: '28 de maio de 1937', origin:'Alemanha', text: 'A Volkswagen é uma fabricante de automóveis alemã fundada em 1937 e uma das maiores do mundo. É conhecida por modelos icônicos como o Fusca e o Golf. A empresa faz parte do Grupo Volkswagen, que inclui marcas como Audi, Porsche e Lamborghini. A Volkswagen também investe fortemente em veículos elétricos e tecnologia de ponta.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAdVBMVEX///8AHlAAAD0AAEYAEksAGE0AAEEAAD8AG08AAEMAFUwAADsADEnc3eEAEEoACUgAADfLzNNbYXtpboX29vfs7O8rNl03QGQ/R2gyO2C2uMKHi5xGTWxSWHWkprKSlaR4fZKanashLVetr7oVJVPCw8sAAC7B/5l/AAAEAklEQVRIiY2W26KjIAxFQUREVFS0rfXa2/z/J05QEdCeM8NLrRhWSHYCCH0bdTl2auj7Qc1jWX/95MvIpkvBCSfLgIfiOWX/YXa/CpmTqLiouetmdRWM5FJcXv8yw5zisB8dRDYOIaY8/820uTGKcfw+vm/126j90eGxSFKeYMzv/vsPw5gSSYvHdzvFYjGjPsG09SfgFXjRiTiqvtndSELKdXlWuhNZAE6M8EtzeTnnpk3T9e0TouOtrHIc8xVNwufR8pbKfn16cYyDxs404ILs1ueK5JfD/kjem+c0xulspyZYSJiFKiI9b14BfdovCcaR9UjGOFf7vz6PnNg2EDDrXA3BIPus9lw4GaRxYf/1Cf84/DnFMTV/LhQngzOZRTZbn8AXSyasCMpTdnoaGfVBAiKXiCoQ53V9HEAPXiAhq3G+ASN8EEsJuwzK7bODAmFRzF/bDjG44yGvRgQKtpsct7H50BQ4xbtr67hvIqiZG2ADTNcwPwjvyDECeBXBIaUrMO2knLSnIdbhoTfXcAQLXqPcF9EKZKhKtVyKtEP36ICseYzJeHfVZoBkQi9S1JBQnXxAJh6ykxCEd3wolAUINoyXYM1gzROygTzARnHg9osNiJAgI5pkod+dkAoWx4edb0BIF5m1MPW7EzIrKIzATe8ixaUyFVFIyXVRjeydr5C6tG3rytsC0UwGVMl18oQ8DQtEHel3wxMy08PNhQUuhsbVBRlYZPOHMRZEPtD0Hu3qnJqa9ZFLIk0dHIDQepRJxwkJasNuublA9IanO2EmxyCUvUtotSW5Ey8NDIzeCxAASO7ufGyUctWtZs53yemK3oFgU2qRz8Ydi9SOsVLrbutwHvChRQ5lFRpDi4S2r8scdLcu6wHRbennI7F51+Wgkbrt64Dq75dC9oCNWAq5cXw1SKj8tZXdkqV1+MCJr/4PoahdZKXb9Vo+ugPG+ABEMlkbVMnsYstRlemGubUaWCn6+MCRR1seWmr7wxLYnu6tZuRQk1XithBOTd8vhW0QGplQ55yB5kPBTu5xmCXbO3QV2uf3IjV7zqyatUdtKZxOUbOYmQmNdCtTZ8YBQvsrnFq7i91v3Yu9owS04OywTZh3U5p5aM4AjXTPGR3SPdODJAp5Y+CpcR3H9ljVAw4lAxxIekOH0fP83WxI/5z5sA1YtzJtj3aaSbfY5oV/mXn/WVYseUJOPD1mETOlTbKPP7H8r5WIA/XNDmLL8jyYvs89ojQUP94860pQwrrT9TLrIkKDvvlms42yZWEaPLvP/lFTTk8hw+j5+cVsMR0KuEvzQFwGpao2CDjctIv+X2YLYxyKiHAJ13kuJVzP+8dvTvojuz9mVVVqnu4/XKj/Arn4Qg/hZzpHAAAAAElFTkSuQmCC', secondimage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WGHugznaNX3S8v8-Rp3Y_V6GCjFCoL3vsQ&s',},
        ],
        version: [
          {name: 'Gol Chaleira', year: '1980', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Golmk1.jpg/450px-Golmk1.jpg'},
          {name: 'Gol GTI', year: '1991', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/14-01-18-autostadt-zeithaus-RalfR-152.jpg/380px-14-01-18-autostadt-zeithaus-RalfR-152.jpg'},
          {name: 'Gol G4', year: '2007', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Volkswagen_Gol_Trendline_Plus_IV_Gen.jpg/450px-Volkswagen_Gol_Trendline_Plus_IV_Gen.jpg'},
        ],
    
      },
      {
        id: 3,
        name: 'Fiat - Punto',
        year: 2012,
        color: 'Branco',
        image: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250307/fiat-punto-1.6-essence-16v-flex-4p-manual-wmimagem17583481045.jpg?s=fill&w=552&h=414&q=60',
        value: 'R$ 38.890',
        KM: '149.000',
        exchange: 'Manual',
        fuel: 'Gasolina e álcool', 
        description: 'O Fiat Punto é um hatchback compacto que se destacou no mercado automobilístico por seu design elegante e europeu. Lançado originalmente na Europa em 1993 e introduzido no Brasil em 2007, o Punto oferece uma combinação de estilo, eficiência e praticidade. Caracteriza-se por suas linhas arredondadas e modernas, faróis expressivos e grade dianteira distintiva. O interior é relativamente espaçoso para sua categoria, com acabamento de qualidade e bom nível de equipamentos. Disponível em versões hatch e aventureira (Punto Adventure), o modelo se destaca pela boa dirigibilidade, conforto de rodagem e opções de motores econômicos. Embora tenha saído de linha no Brasil em 2018, o Punto deixou sua marca como uma alternativa sofisticada no segmento de compactos, apreciado por consumidores que buscavam um veículo com toque italiano e bom custo-benefício.',
        creators: [
          {name: 'Giorgetto Giugiaro', role: 'Designer', secondname: 'Chevrolet', secondrole: 'Fabricante', gender: 'Masculino' ,  birthDate: '07-08-1938', birthPlace:'Garessio, Itália',  Resume:'Giorgetto Giugiaro (nascido em 1938, Itália) é um designer de automóveis italiano considerado um dos mais influentes da história. Fundou a Italdesign e criou modelos icônicos como o Volkswagen Golf, DeLorean DMC-12 e Fiat Panda.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/GiorgettoGiugiaro_%28cropped%29.jpg/450px-GiorgettoGiugiaro_%28cropped%29.jpg', secondimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRORVryOFGGSDgS-0sjODhpjwdCMljwwKxyPQ&s',},
          {name: 'Fiat', role: 'Fabricante', secondname:'Ferrari', secondrole:'Fabricante', date: '11 de julho de 1899',  origin:'Itália', text: 'A Fiat é uma fabricante de automóveis italiana fundada em 1899, conhecida por carros compactos e acessíveis como o Fiat 500 e o Uno. É parte do grupo Stellantis, formado pela fusão com a PSA Group. A Fiat possui uma forte presença na Europa e na América Latina, com foco em veículos urbanos e comerciais leves.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA4VBMVEUTCxkTCRgUABYAAAAACxgNCxkRGB8GYDsHdUEFTTETBBqSjo7Fxb6amJUcFCIYDx6DgIKnsa6DCh7eDCnNCyRVCRkTBhgJKSUAiksRVDIrJjDTz8ny8ueqqKQ0Lzizsa21wrsyCRm9CSP/DS4Ak08Ae0UGABB4cnXj5dxTTlUAAAhoZGhmaWxkCBrxCSijCyIQCxkCaTwAcjkIFRYYDCHT3tWMCB17CR8HIiMEXiVBNkMdHScmBBZMChwJNB8AAAt9en2zCSQgChoAeTYAi1NFP0YFMCRCChwlHCyTnp0VISKHFICJAAABb0lEQVR4AcXQhZqCMAAAYNjAoK2JbHAxnMPu7tb3f6Cb9x1wb+A6/4X0xiADAGQZQvhbSJKiKGoyl8nm8qqmG6ZlO0YByMVSuRLPoqrr1pCHiY+CD/IJv75pKZkE+bBeZQ3Oo2YLk3az06U9u/+naoNwOBr7xBjbOp8EbEq7MyVW5667YEuDmFCohdX6m5Y3saoJdYsanES7FuZ7ddOlh2Os9gfuaTQ2CR7bDp9ErEi70/Su9fOCXQziQ88nfqCW07sK1XWvr7u2YIS5YwNKvxNVHYQDzTY5Dtie4Bab0W5RSdUwzy4fxLRW4q4BE+rtv1plLc4b7MK53v+itNxP1Gw41Cyd4Ag2CG7vZpROE/WaC2taIFSvKf71pdJYldHrrijifI/unDy0W4mWlVjNCPWJHKE2W4QLtUuLqVoPa7InfsDTxM+vwDelx/R7stkq8nSzhWzHb6PjtNwTG+NZAJAkQ7iTpKYo+ooi5t4WfgDfdjB9ZNc2CQAAAABJRU5ErkJggg==', secondimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBtgMhjh0gXv8rFWH03vwaAqU9sbiuN89IXwxNa827U5NNgPFGdivLj4hmx3nOWXHCKw&usqp=CAU',}
        ],
        version: [
          {name: 'Fiat Punto', year: '1993', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/1998_Fiat_Punto_SX_Selecta_1.2_Front.jpg/450px-1998_Fiat_Punto_SX_Selecta_1.2_Front.jpg'},
          {name: 'Punto Classic', year: '1999', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2000_Fiat_Punto_1.2_Front.jpg/450px-2000_Fiat_Punto_1.2_Front.jpg'},
          {name: 'Grande Punto', year: '2005', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Grande_punto_5tuerer.jpg/450px-Grande_punto_5tuerer.jpg'},
        ],

      }
    ];

    //Filtra os carros com base no intervalo de anos e filtros selecionado
    const filteredCars = cars.filter(car => {
      const yearMatch = car.year >= yearRange[0] && car.year <= yearRange[1];
      
      if (selectedFilter === 'all') return yearMatch;
      if (selectedFilter === 'manufacturer') return yearMatch && car.manufacturer === filterValue;
      if (selectedFilter === 'transmission') return yearMatch && car.transmission === filterValue;
      if (selectedFilter === 'fuel') return yearMatch && car.fuel === filterValue;
      if (selectedFilter === 'color') return yearMatch && car.color.toLowerCase().includes(filterValue.toLowerCase());
      
      return yearMatch;
    });
  
    //manipulador de eventos
    const handleDetailsPress = (car) => {
      setLoading(true);
      setSelectedCar(car);
      setLoading(false);
    };
  
    const handleBackPress = () => {
      setSelectedCar(null);
    };
  
    const handleCreatorPress = (creator) => {
      setSelectedCreator(creator);
    };
  

 // Componente de Picker para Filtros
 const AdvancedFilterPicker = () => {
  return (
    <View style={styles.filterPickerContainer}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(itemValue) => {
          setSelectedFilter(itemValue);
          setFilterValue('');
        }}
        style={styles.picker}
        dropdownIconColor="#3498db"
      >
        <Picker.Item label="Todos os carros" value="all" />
        <Picker.Item label="Por Fabricante" value="manufacturer" />
        <Picker.Item label="Por Tipo de Câmbio" value="transmission" />
        <Picker.Item label="Por Combustível" value="fuel" />
        <Picker.Item label="Por Cor" value="color" />
      </Picker>

      {selectedFilter === 'manufacturer' && (
        <Picker
          selectedValue={filterValue}
          onValueChange={setFilterValue}
          style={styles.subPicker}
        >
          <Picker.Item label="Selecione o fabricante" value="" />
          <Picker.Item label="Volkswagen" value="volkswagen" />
          <Picker.Item label="Fiat" value="fiat" />
        </Picker>
      )}

      {selectedFilter === 'transmission' && (
        <Picker
          selectedValue={filterValue}
          onValueChange={setFilterValue}
          style={styles.subPicker}
        >
          <Picker.Item label="Selecione o câmbio" value="" />
          <Picker.Item label="Manual" value="manual" />
        </Picker>
      )}

      {selectedFilter === 'fuel' && (
        <Picker
          selectedValue={filterValue}
          onValueChange={setFilterValue}
          style={styles.subPicker}
        >
          <Picker.Item label="Selecione o combustível" value="" />
          <Picker.Item label="Gasolina" value="gasolina" />
          <Picker.Item label="Flex" value="flex" />
        </Picker>
      )}
    </View>
  );
};

// Componente de Picker para Versões
const VersionPicker = ({ versions }) => {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);

  return (
    <View style={styles.versionPickerContainer}>
      <Text style={styles.versionPickerLabel}>Selecione uma versão:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedVersion}
          onValueChange={setSelectedVersion}
          style={styles.versionPicker}
          dropdownIconColor="#3498db"
        >
          {versions.map((version, index) => (
            <Picker.Item 
              key={index} 
              label={`${version.name} (${version.year})`} 
              value={version} 
            />
          ))}
        </Picker>
      </View>
      
      <View style={styles.selectedVersionContainer}>
        <Image 
          source={{ uri: selectedVersion.image }} 
          style={styles.selectedVersionImage}
        />
        <Text style={styles.selectedVersionName}>{selectedVersion.name}</Text>
        <Text style={styles.selectedVersionYear}>{selectedVersion.year}</Text>
      </View>
    </View>
  );
};

    //Mostra um indicador de carregamento se o estado loading for true
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      );
    }
  
    return (
    
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WikCar</Text>
      </View>
      
      {/* Tela de detalhes do criador */}
      
      {selectedCreator ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.creatorCardDetails}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCreator(null)}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
            <Image 
              source={{ uri: selectedCreator.image }} 
              style={styles.creatorImageDetails}
              onError={() => console.log('Erro ao carregar imagem')}
            />
            <Text style={styles.creatorName}>{selectedCreator.name}</Text>
            <Text style={styles.creatorResume}>{selectedCreator.Resume}</Text>
            <Text style={styles.creatorText}>{selectedCreator.text}</Text>
            
            {selectedCreator.gender ? (
              <View style={styles.infoBlock}>
                <Text style={styles.infoText}>Sexo: {selectedCreator.gender}</Text>
                <Text style={styles.infoText}>Data de Nascimento: {selectedCreator.birthDate}</Text>
                <Text style={styles.infoText}>Local de Nascimento: {selectedCreator.birthPlace}</Text>
              </View>
              ) : (
                <View style={styles.infoBlock}>
                  <Text style={styles.infoText}>Fabricante: {selectedCreator.name}</Text>
                  <Text style={styles.infoText}>Fundada: {selectedCreator.date}</Text>
                  <Text style={styles.infoText}>Origem: {selectedCreator.origin}</Text>
                </View>
            )}
            
            <View style={styles.creatorsContainer}>
              <Text style={styles.creatorsTitle}>Recomendados: </Text>
              {selectedCar.creators.map((creator, index) => (
                <View style={styles.creatorCard2} key={index}>
                  <Image source={{ uri: creator.secondimage }} style={styles.creatorImage} />
                  <View style={styles.creatorInfo}>
                    <Text style={styles.creatorName}>{creator.secondname}</Text>
                    <Text style={styles.creatorRole}>{creator.secondrole}</Text>
                  </View>
                </View>   
              ))}
            </View>
          </View>
        </ScrollView>
      ) : !selectedCar ? (
        // Tela principal com lista de carros 
        <View style={styles.mainContainer}>
          {/* Filtro por Ano */}
          <View style={styles.filterContainer}>
            <Text style={styles.filterTitle}>Filtrar por Ano: {yearRange[0]} - {yearRange[1]}</Text>
            <View style={styles.sliderWrapper}>
              <Text style={styles.sliderLabel}>Mínimo: {yearRange[0]}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1978}
                maximumValue={2012}
                step={1}
                value={yearRange[0]}
                onValueChange={(value) => setYearRange([value, yearRange[1]])}
                minimumTrackTintColor="#3498db"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#3498db"
              />
            </View>
            <View style={styles.sliderWrapper}>
              <Text style={styles.sliderLabel}>Máximo: {yearRange[1]}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1978}
                maximumValue={2012}
                step={1}
                value={yearRange[1]}
                onValueChange={(value) => setYearRange([yearRange[0], value])}
                minimumTrackTintColor="#3498db"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#3498db"
              />
            </View>
          </View>

          {/* Filtros Avançados */}
          <AdvancedFilterPicker />

          {/* Carrossel Horizontal */}
          <Text style={styles.sectionTitle}>Destaques</Text>
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
          >
            {filteredCars.map((car) => (
              <TouchableOpacity 
                key={car.id} 
                style={styles.carouselCard}
                onPress={() => handleDetailsPress(car)}
              >
                <Image 
                  source={{ uri: car.image }} 
                  style={styles.carouselImage}
                  resizeMode="cover"
                  onError={() => console.log('Erro ao carregar imagem do carro')}
                />
                <View style={styles.carouselTextContainer}>
                  <Text style={styles.carouselTitle}>{car.name}</Text>
                  <Text style={styles.carouselSubtitle}>{car.year} • {car.color}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Lista Vertical completa de carros*/}
          <Text style={styles.sectionTitle}>Todos os Modelos</Text>
          <ScrollView contentContainerStyle={styles.listContainer}>
            {filteredCars.map((car) => (
              <TouchableOpacity 
                key={car.id} 
                style={styles.carCard}
                onPress={() => handleDetailsPress(car)}
              >
                <Image 
                  source={{ uri: car.image }} 
                  style={styles.carImage}
                  resizeMode="cover"
                />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{car.name}</Text>
                  <Text style={styles.carText}>Ano: {car.year}</Text>
                  <Text style={styles.carText}>Cor: {car.color}</Text>
                </View>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => handleDetailsPress(car)}
                >
                  <Text style={styles.detailsButtonText}>Detalhes</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        // Tela de detalhes do carro
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.carDetailsContainer}>
            <Image 
              source={{ uri: selectedCar.image }} 
              style={styles.carDetailsImage}
              resizeMode="cover"
            />
            <Text style={styles.carDetailsName}>{selectedCar.name}</Text>

            <View style={styles.descriptionContainer}>
              <Text style={styles.carDetailsDescription}>{selectedCar.description}</Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Ano: {selectedCar.year}</Text>
              <Text style={styles.detailText}>Cor: {selectedCar.color}</Text>
              <Text style={styles.detailText}>Valor: {selectedCar.value}</Text>
              <Text style={styles.detailText}>KM: {selectedCar.KM}</Text>
              <Text style={styles.detailText}>Câmbio: {selectedCar.exchange}</Text>
              <Text style={styles.detailText}>Combustível: {selectedCar.fuel}</Text>
            </View>
          </View>

          <View style={styles.creatorsContainer}>
            <Text style={styles.sectionTitle}>Criadores:</Text>
            {selectedCar.creators.map((creator, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.creatorCard}
                onPress={() => handleCreatorPress(creator)}
              >
                <Image 
                  source={{ uri: creator.image }} 
                  style={styles.creatorImage}
                />
                <View style={styles.creatorInfo}>
                  <Text style={styles.creatorName}>{creator.name}</Text>
                  <Text style={styles.creatorRole}>{creator.role}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Substitui a versão original pelo VersionPicker */}
          <VersionPicker versions={selectedCar.version} />
        </ScrollView>
      )}
      </ScrollView>
    </SafeAreaView>
    
    );
  };
  
  const styles = StyleSheet.create({
    //Estilo do container principal
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    //Estilo do container de loading
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Estilo do container da tela principal 
    mainContainer: {
      flex: 1,
      padding: 10,
    },
    
    scrollContainer: {
      paddingBottom: 20,
    },
    
    filterContainer: {
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    filterTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#2c3e50',
    },
    sliderWrapper: {
      marginBottom: 15,
    },
    sliderLabel: {
      fontSize: 14,
      color: '#7f8c8d',
      marginBottom: 5,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      marginLeft: 10,
      color: '#2c3e50',
    },
    carouselContainer: {
      paddingHorizontal: 10,
      paddingBottom: 10,
      height: 200
      },
    carouselCard: {
      width: 200,
      marginRight: 15,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
      
    },
    carouselImage: {
      width: '100%',
      height: 120,
    },
    carouselTextContainer: {
      padding: 10,
    },
    carouselTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    carouselSubtitle: {
      fontSize: 14,
      color: '#7f8c8d',
    },
    listContainer: {
      paddingHorizontal: 10,
      paddingBottom: 20,
    
    },
    carCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 15,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    carImage: {
      width: 100,
      height: 80,
      borderRadius: 8,
      marginRight: 10,
    },
    carInfo: {
      flex: 1,
    },
    carName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    carText: {
      fontSize: 14,
      color: '#7f8c8d',
    },
    detailsButton: {
      backgroundColor: '#3498db',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    detailsButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    backButton: {
      backgroundColor: '#7f8c8d',
      padding: 10,
      borderRadius: 5,
      margin: 10,
      alignSelf: 'flex-start',
    },
    backButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    carDetailsContainer: {
      padding: 15,
    },
    carDetailsImage: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 15,
    },
    carDetailsName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#2c3e50',
    },
    descriptionContainer: {
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    carDetailsDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: '#34495e',
    },
    detailsContainer: {
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 8,
      color: '#34495e',
    },
    creatorsContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    },
    creatorCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    creatorImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    creatorInfo: {
      flex: 1,
       width: '70%',
      alignSelf:'center'
    },
    creatorName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    creatorRole: {
      fontSize: 14,
      color: '#7f8c8d',
    },
    versionsContainer: {
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    versionCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    versionImage: {
      width: 80,
      height: 60,
      borderRadius: 8,
      marginRight: 10,
    },
    versionInfo: {
      flex: 1,
    },
    versionName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    versionYear: {
      fontSize: 14,
      color: '#7f8c8d',
    },
    creatorCardDetails: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      margin: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    creatorImageDetails: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginBottom: 15,
    },
    creatorResume: {
      fontSize: 14,
      lineHeight: 20,
      color: '#34495e',
      marginBottom: 15,
    },
    infoBlock: {
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    infoText: {
      fontSize: 14,
      marginBottom: 5,
      color: '#34495e',
    },

    creatorCard2:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      width: '100%',
      alignSelf:"center"
    },
    
    creatorsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    creatorText: {
      marginBottom: 20,
    },
    header: {
      backgroundColor: '#87ceeb', 
      paddingVertical: 20,        // Mais espaçamento
      shadowColor: '#000',        // Adicionar sombra
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    
    headerTitle: {
      fontSize: 25,
      fontWeight: '800',
      textAlign: 'center', // Isso centraliza o texto dentro do próprio componente
      marginTop: '20  ',
      fontWeight: 'italic',
      fontFamily: 'Poppins_400Regular'
    },
    
    filterPickerContainer: {
      margin: 15,
      backgroundColor: '#f8f9fa',
      borderRadius: 10,
      overflow: 'hidden',
    },
    picker: {
      width: '100%',
      backgroundColor: '#fff',
    },
    subPicker: {
      width: '100%',
      backgroundColor: '#f0f0f0',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    versionPickerContainer: {
      margin: 15,
      padding: 15,
      backgroundColor: '#f8f9fa',
      borderRadius: 10,
    },
    versionPickerLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      color: '#2c3e50',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 15,
    },
    versionPicker: {
      width: '100%',
      backgroundColor: '#fff',
    },
    selectedVersionContainer: {
      alignItems: 'center',
      padding: 10,
    },
    selectedVersionImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
    selectedVersionName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
    },
    selectedVersionYear: {
      fontSize: 16,
      color: '#7f8c8d',
    },

    
  });
  
  export default App;