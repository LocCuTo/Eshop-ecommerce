import React, { useEffect } from 'react';
import styles from './OrderHistory.module.scss';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderHistory, STORE_ORDERS } from '../../redux/slice/orderSlice';
import { selectUserID } from '../../redux/slice/authSlice';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading } = useFetchCollection('orders');
    const orders = useSelector(selectOrderHistory);
    const userID = useSelector(selectUserID);

    useEffect(() => {
        dispatch(STORE_ORDERS(data));
    }, [dispatch, data]);

    const handleClick = (id) => {
        navigate(`/order-details/${id}`);
    };

    const filterOrders = orders.filter((order) => order.userID === userID);

    return (
        <section>
            <div className={`container ${styles.order}`}>
                <h2>Your Order History</h2>
                <p>
                    Open an order to leave a <b>Product Review</b>
                </p>
                <br />
                <>
                    {isLoading && <Loader />}
                    <div className={styles.table}>
                        {filterOrders.length === 0 ? (
                            <p>No order found</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>s/n</th>
                                        <th>Date</th>
                                        <th>Order ID</th>
                                        <th>Order Amount</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterOrders.map((order, index) => (
                                        <tr key={order.id} onClick={() => handleClick(order.id)}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {order.orderDate} at {order.orderTime}
                                            </td>
                                            <td>{order.id}</td>
                                            <td>
                                                {'$'}
                                                {order.orderAmount}
                                            </td>
                                            <td>
                                                <p
                                                    className={
                                                        order.orderStatus !== 'Delivered'
                                                            ? `${styles.pending}`
                                                            : `${styles.delivered}`
                                                    }
                                                >
                                                    {order.orderStatus}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            </div>
        </section>
    );
};

export default OrderHistory;
