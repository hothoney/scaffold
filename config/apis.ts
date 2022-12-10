export default {
  baseUrl: 'https://a782-240e-3b3-623-3840-3d25-ded3-f0ec-2320.jp.ngrok.io/',
  routes: {
    register: '/api/User/Register', // 注册接口
    login: '/api/User/Login', // 登录接口
    drug: '/api/Drug', // 药品接口
    drugRecord: '/api/DrugRecord', // 药品记录接口
    drugRecordList: '/api/DrugRecord/PageList', // 药品记录接口
    petSpecie: '/api/PetSpecie',
    petSpecieList: '/api/PetSpecie/PageList',
    Foster: '/api/Foster',
    FosterList: '/api/Foster/PageList',
  },
};
