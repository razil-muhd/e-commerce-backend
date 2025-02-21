import express from 'express';

import {
	bannerCreate,
	deleteBanners,
	getAllBanners,
	getBannerbyid,
	updatebanner,
} from '../../../controllers/dashboard/BannerController.js';
import { uploadFile } from '../../../utils/fileuploader.js';

const bannerRouter = express.Router();

bannerRouter.post('/create',uploadFile('banner').any(), bannerCreate);
bannerRouter.get('/get-all', getAllBanners);
bannerRouter.get('/get-one/:id', getBannerbyid);
bannerRouter.put('/update/:id',uploadFile('banner').any(), updatebanner);
bannerRouter.delete('/delete/:id', deleteBanners);

export default bannerRouter;
