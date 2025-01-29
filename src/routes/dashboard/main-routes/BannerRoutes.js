import express from 'express';

import {
	bannerCreate,
	deleteBanners,
	getAllBanners,
	getBannerbyid,
	updatebanner,
} from '../../../controllers/dashboard/BannerController.js';

const bannerRouter = express.Router();
bannerRouter.post('/create', bannerCreate);
bannerRouter.get('/get-all', getAllBanners);
bannerRouter.get('/get-one/:id', getBannerbyid);
bannerRouter.put('/update/:id', updatebanner);
bannerRouter.delete('/delete/:id', deleteBanners);

export default bannerRouter;
