import { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { apisConfig } from '../../config';
import request from '../../services/request';
import PoweredTable from '../../components/PoweredTable';
interface PetData {
  id: number;
  modified: Date;
  modifiedBy: number;
  deleted: boolean;
  created: Date;
  createdBy: number;
  name: string;
  petSpeciesId: number;
  principal: number;
  owner: string;
}

const columns: ProColumns<Partial<PetData>, 'text'>[] = [
  {
    title: '宠物主人',
    dataIndex: 'owner',
    valueType: 'select',
    fieldProps: {
      showSearch: true,
      filterOption: (input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes(input.toLowerCase()),
    },
    request: async () => {
      const response = await request<
        {
          userName: string;
          realName: string;
          passWord: string;
          userType: number;
          id: number;
          modified: Date;
          modifiedBy: number;
          deleted: boolean;
          created: Date;
          createdBy: number;
        }[]
      >({
        url: '/api/User/PageList',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((user) => ({
          label: user.realName,
          value: user.id,
        })) || []
      );
    },
  }, 
  {
    title: '宠物名字',
    dataIndex: 'name',
  },
  {
    title: '宠物种类',
    dataIndex: 'petSpeciesId', valueType: 'select',
    fieldProps: {
      showSearch: true,
      filterOption: (input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes(input.toLowerCase()),
    },
    request: async () => {
      const response = await request<
        {
          name: string;
          description: string;
          id: number;
        }[]
      >({
        url: apisConfig.routes.petSpecieList,
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((petSpecies) => ({
          label: petSpecies.name,
          value: petSpecies.id,
        })) || []
      );
    },
  },

  {
    title: '负责人',
    dataIndex: 'principal',
    valueType: 'select',
    fieldProps: {
      showSearch: true,
      filterOption: (input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes(input.toLowerCase()),
    },
    request: async () => {
      const response = await request<
        {
          userName: string;
          realName: string;
          passWord: string;
          userType: number;
          id: number;
          modified: Date;
          modifiedBy: number;
          deleted: boolean;
          created: Date;
          createdBy: number;
        }[]
      >({
        url: '/api/User/PageList',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((user) => ({
          label: user.realName,
          value: user.id,
        })) || []
      );
    },
  },

];


const pet = () => {
  return (
    <>
      <PoweredTable<Partial<PetData>>
        debounceTime={300}
        columns={columns}
        api={apisConfig.routes.pet}
        pageListApi={apisConfig.routes.petList}
        // readonly
      />
    </>
  );
};

export default pet;
