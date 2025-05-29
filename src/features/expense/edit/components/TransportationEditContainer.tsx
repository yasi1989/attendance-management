import { fetchRouteInfoById } from '../../services/fetchExpense';
import { ExpenseType } from '../../history/type/expenseType';
import { TransportationForm } from '../../components/TransportationForm';

type TransportationEditContainerProps = {
  type: 'add' | 'edit';
  expense: ExpenseType | undefined;
};

const TransportationEditContainer = ({ type, expense }: TransportationEditContainerProps) => {
  const routeInfo = fetchRouteInfoById(expense?.id ?? '');
  return <TransportationForm type={type} expense={expense} routeInfo={routeInfo} />;
};

export default TransportationEditContainer;
