import PerfectScrollbar from 'react-perfect-scrollbar'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ThemeContext from '../../Store/ThemeContext'
import { useContext} from 'react';
import DoughnutChart from '../Ui/Chart/DoughnutChart';
import BarChart from '../Ui/Chart/BarChart';
import PolarAreaChart from '../Ui/Chart/PolarAreaChart';
import PieChart from '../Ui/Chart/PieChart'
import { FormattedMessage } from 'react-intl';


const Dashbord = () => {
    const ctx = useContext(ThemeContext)


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: ctx.skin === 'Light' ? '' : '#fff',
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: ctx.skin === 'Light' ? '#eee' : '#202124',
    }));
    return (
        <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true, suppressScrollX: true }} >
            <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 7" display="grid" gap={1}>
                        <Box gridColumn="span 12"><Item><BarChart /></Item></Box>
                        <Box gridColumn="span 12">
                            <Item > <PolarAreaChart /></Item>
                        </Box>
                    </Box>
                    <Box gridColumn="span 5" display="grid" gap={2}>
                        <Box gridColumn="span 12">
                            <Item  >
                                <DoughnutChart title={<FormattedMessage id="InventoryBynumber" />} counterUnit="number" />
                            </Item>
                        </Box>
                        <Box gridColumn="span 12">
                            <Item>
                                <DoughnutChart title={<FormattedMessage id="InventoryByWeight" />} counterUnit="weight" />
                            </Item>
                        </Box>
                    </Box>
                    <Box gridColumn="span 6">
                        <Item>
                            <PieChart title={<FormattedMessage id="OrderGoodsByWeight" />} counterUnit="weight" />
                        </Item>
                    </Box>
                    <Box gridColumn="span 6">
                        <Item><PieChart title={<FormattedMessage id="OrderGoodsByNumber" />} counterUnit="number" /></Item>
                    </Box>
                </Box>
            </Box>
         

        </PerfectScrollbar>
    )
}
export default Dashbord