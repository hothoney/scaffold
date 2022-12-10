export default {
  baseUrl: 'https://3347-240e-3b3-621-630-3d25-ded3-f0ec-2320.jp.ngrok.io/',
  routes: {
    register: '/api/User/Register', // 注册接口
    login: '/api/User/Login', // 登录接口
    drug: '/api/Drug', // 药品接口
    drugList: '/api/Drug/PageList', // 药品接口
    drugRecord: '/api/DrugRecord', // 药品记录接口
    drugRecordList: '/api/DrugRecord/PageList', // 药品记录接口
    petSpecie: '/api/PetSpecie', //宠物种类
    petSpecieList: '/api/PetSpecie/PageList', //宠物种类
    Foster: '/api/Foster', //寄养
    FosterList: '/api/Foster/PageList',
    pet: '/api/Pet', //宠物
    petList: '/api/Pet/PageList',
  },
};
