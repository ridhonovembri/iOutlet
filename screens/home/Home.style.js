import { StyleSheet } from "react-native";
import {COLORS, SIZES } from '../../constants/index'

const styles = StyleSheet.create({
  header : {
    flexDirection: 'row',
    marginHorizontal: 10    
  },
  cataloguesItem: {
    height: 110,
    width: 110,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderColor: COLORS.primary,
    borderRadius: 10
  },
  ordersItem: {
    height: 80,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,    
  },
  topRankItem: {
    height: 80,
    width: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderColor: COLORS.primary,    
    backgroundColor: COLORS.gray
  },
  
});

export default styles;
