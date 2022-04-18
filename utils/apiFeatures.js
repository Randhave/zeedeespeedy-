
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    // for user
    search() {
        // console.log("data from auth.js file " , this.query);
        console.log("query from parameter ", this.queryStr);
        console.log("keyword ", this.queryStr.keyword);
        const keyword = this.queryStr.keyword
            ? {
                firstName: {
                    $regex: this.queryStr.keyword,
                    $options: "i"   // for case sensetive 
                }
            }
            : {};

        this.query = this.query.find({ ...keyword });

        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        // removing some fileds for category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach((key) => delete queryCopy[key]);
        // console.log(queryCopy)
        // filter price and rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr)
        // this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(pageNumber, pagesSize) {
        // const currentPage = Number(this.queryStr.page) || 1;
        // const skip = resultPerPage * (currentPage - 1);
        // this.query = this.query.limit(resultPerPage).skip(skip);
        // let pageNumber = 1;
        // let pagesSize = 3;
        this.query = this.query.skip((pageNumber - 1) * pagesSize).limit(pagesSize)
        return this;
    }

    // for brand
    brandSearch() {
        const keyword = this.queryStr.keyword
            ? {
                Name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"   // for case sensetive 
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this
    }

    // for brand category search
    buisnessCategorySearch() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"   // for case sensetive 
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this
    }

    
    // for product search on the basis of firstName
    productSearch() {
        const keyword = this.queryStr.keyword
            ? {
                productName: {
                    $regex: this.queryStr.keyword,
                    $options: "i"   // for case sensetive 
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this
    }
}

export default ApiFeatures