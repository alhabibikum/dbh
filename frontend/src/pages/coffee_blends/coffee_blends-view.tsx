import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/coffee_blends/coffee_blendsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const Coffee_blendsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { coffee_blends } = useAppSelector((state) => state.coffee_blends)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View coffee_blends')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View coffee_blends')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/coffee_blends/coffee_blends-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{coffee_blends?.name}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Price</p>
                  <p>{coffee_blends?.price || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>StockLevel</p>
                  <p>{coffee_blends?.stock_level || 'No data'}</p>
                </div>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/coffee_blends/coffee_blends-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Coffee_blendsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default Coffee_blendsView;
