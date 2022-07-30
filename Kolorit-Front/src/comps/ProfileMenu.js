import home from "../assets/home.png";
import shop from "../assets/shop.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
import service from "../assets/service.png";

export const ProfileMenu =[
    {
        id: 1,
        title: 'Личный кабинет',
        img: home,
    },
    {
        id: 2,
        title: 'Заказы',
        subtitle1: 'Активные заказы',
        subtitle2: 'Все заказы',
        img: shop,
    },
    {
        id: 3,
        title: 'Профиль',
        subtitle1: 'Личные данные',
        subtitle2: 'Мои адреса',
        subtitle3: 'Накопительная карта',
        img: profile,
    },
    {
        id: 4,
        title: 'Товары',
        subtitle1: 'Избранное',
        subtitle2: 'Просмотренные товары',
        subtitle3: 'Корзина',
        img: cart,
    },
    {
        id: 5,
        title: 'Сервисное обслуживание',
        subtitle1: 'Обмен и возврат',
        subtitle2: 'Ремонт и диагностика',
        subtitle3: 'Мои обращения',
        subtitle4: 'Возврат денежных средств',
        img: service,
    },
]