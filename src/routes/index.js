import express from 'express';
const router = express.Router();

// Importando rotas existentes
import paymentRoutes from './payment.routes.js';
import RoutesUser from './users.routes.js';
import RoutesQuest from './quest.routes.js';
import RoutesProgress from './progress.routes.js';
import RoutesPractices from './practices.routes.js';
import RoutesStore from './store.routes.js';
import RoutesFollowers from './followers.routes.js';
import RoutesUserRewards from './user_rewards.routes.js';
import RoutesUserPurchases from './user_purchases.routes.js';
import RoutesUserQuests from './user_quests.routes.js';
import RoutesRewards from './rewards.routes.js';
import RoutesInsignias from './insignias.routes.js';
import AuthRoutes from './auth.routes.js';
import MonthlyAchievementsRoutes from './monthlyAchievements.routes.js';
import CustomizationsRoutes from './customization.routes.js'; // nome corrigido
import achievementsRoutes from './achievements.routes.js'; // nome corrigido
import UserInsigniasRoutes from './user_insignias.routes.js';
import ConfigRoutes from './config.routes.js';
import UserProfilesRoutes from './user_profiles.routes.js';
import CurrencyRoutes from './currency.routes.js';
import StreakRoutes from './streak.routes.js';
import BlocksRoutes from './blocks.routes.js';
import NotificationsRoutes from './notifications.routes.js';
import PrivacySettingsRoutes from './privacy_settings.routes.js';
import userCustomizationsRoutes from './user_customizations.routes.js'; // Importando as rotas de customização de usuário
import themesRoutes from './themes.routes.js'; // Importando as rotas de temas
import UserAchievementsRoutes from './user_achievements.routes.js';

// Usando as rotas com o `router`
router.use("/payment", paymentRoutes);
router.use("/users", RoutesUser);
router.use("/quests", RoutesQuest);
router.use("/progress", RoutesProgress);
router.use("/practices", RoutesPractices);
router.use("/store", RoutesStore);
router.use("/followers", RoutesFollowers);
router.use("/user-rewards", RoutesUserRewards);
router.use("/user-purchases", RoutesUserPurchases);
router.use("/user-quests", RoutesUserQuests);
router.use("/rewards", RoutesRewards);
router.use("/achievements", achievementsRoutes);
router.use("/insignias", RoutesInsignias);
router.use("/customization", CustomizationsRoutes);
router.use('/auth', AuthRoutes);
router.use('/user-Monthlyachievements', MonthlyAchievementsRoutes);
router.use("/user-insignias", UserInsigniasRoutes)
router.use("/config", ConfigRoutes);
router.use("/user-profiles", UserProfilesRoutes); // Usando as rotas de perfis de usuário
router.use("/currency", CurrencyRoutes);
router.use("/streak", StreakRoutes);
router.use("/blocks", BlocksRoutes);
router.use("/notifications", NotificationsRoutes);
router.use("/privacy-settings", PrivacySettingsRoutes);
router.use("/user-customizations", userCustomizationsRoutes); // Usando as rotas de customização de usuário
router.use("/themes", themesRoutes);
router.use('/user-achievements', UserAchievementsRoutes);

export default router;
