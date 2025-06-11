import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Link, useForm, Head, router } from "@inertiajs/react";
import { ArrowLeft, Briefcase, Calendar, DollarSign, User, Tag, FileText } from "lucide-react";
import { User as UserType } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { DatePickerWithRange } from "@/Components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { TagInput } from "@/Components/project/TagInput";

interface Props {
    users: UserType[];
    auth: {
        user: UserType;
    };
}

export default function Create({ users, auth }: Props) {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

    // Role check: Only allow admin or project manager
    useEffect(() => {
        const allowedRoles = ["admin", "project manager"];
        if (!allowedRoles.includes(auth.user.role.toLowerCase())) {
            router.visit("/dashboard");
        }
    }, [auth.user.role]);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        budget: "",
        category: "",
        tags: [] as string[],
        is_template: false as boolean,
        user_id: auth.user.id.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("projects.store"));
    };

    const handleDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range);
        if (range?.from) {
            setData("start_date", range.from.toISOString().split("T")[0]);
        }
        if (range?.to) {
            setData("end_date", range.to.toISOString().split("T")[0]);
        }
    };

    const handleTagsChange = (newTags: string[]) => {
        setData("tags", newTags);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />
            <div
                className="min-h-screen py-8 px-4"
                style={{
                    background: "linear-gradient(135deg, #ff8c42 0%, #ff6b35 20%, #f7931e 40%, #ff8c42 60%, #ff6b35 80%, #f7931e 100%)",
                    backgroundSize: "400% 400%",
                    animation: "gradientShift 8s ease infinite",
                }}
            >
                <style jsx>{`
                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}</style>
                
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <Button 
                            variant="ghost" 
                            asChild 
                            className="mb-6 text-white hover:bg-white/20 hover:text-white border border-white/30 backdrop-blur-sm"
                        >
                            <Link href="/projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        
                        <div className="text-center mb-2">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-4">
                                <Briefcase className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                Buat Projek Baru
                            </h1>
                            <p className="text-white/90 text-lg">
                                Isi detail projek untuk memulai pengerjaan
                            </p>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
                        <form onSubmit={handleSubmit}>
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                                <CardTitle className="text-2xl flex items-center">
                                    <FileText className="mr-3 h-6 w-6" />
                                    Detail Projek
                                </CardTitle>
                                <CardDescription className="text-orange-100">
                                    Lengkapi informasi projek yang akan dikerjakan
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="p-8 space-y-8">
                                {/* Project Name */}
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700 flex items-center">
                                        <Briefcase className="mr-2 h-5 w-5 text-orange-500" />
                                        Nama Projek
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        required
                                        className="text-lg p-4 border-2 border-orange-200 focus:border-orange-500 rounded-lg"
                                        placeholder="Masukkan nama projek..."
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <span className="mr-1">⚠️</span>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <Label htmlFor="description" className="text-lg font-semibold text-gray-700 flex items-center">
                                        <FileText className="mr-2 h-5 w-5 text-orange-500" />
                                        Deskripsi Pengerjaan
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        required
                                        className="text-base p-4 border-2 border-orange-200 focus:border-orange-500 rounded-lg min-h-32"
                                        placeholder="Jelaskan detail pengerjaan projek..."
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <span className="mr-1">⚠️</span>
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Two Column Layout */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Manager Selection */}
                                    <div className="space-y-3">
                                        <Label htmlFor="user_id" className="text-lg font-semibold text-gray-700 flex items-center">
                                            <User className="mr-2 h-5 w-5 text-orange-500" />
                                            Penanggung Jawab
                                        </Label>
                                        <Select
                                            value={data.user_id}
                                            onValueChange={(value) => setData("user_id", value)}
                                        >
                                            <SelectTrigger className="text-lg p-4 border-2 border-orange-200 focus:border-orange-500 rounded-lg">
                                                <SelectValue placeholder="Pilih penanggung jawab..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={user.id.toString()}
                                                        className="text-base p-3"
                                                    >
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.user_id && (
                                            <p className="text-sm text-red-500 flex items-center">
                                                <span className="mr-1">⚠️</span>
                                                {errors.user_id}
                                            </p>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-3">
                                        <Label htmlFor="category" className="text-lg font-semibold text-gray-700 flex items-center">
                                            <Tag className="mr-2 h-5 w-5 text-orange-500" />
                                            Kategori
                                        </Label>
                                        <Input
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData("category", e.target.value)}
                                            className="text-lg p-4 border-2 border-orange-200 focus:border-orange-500 rounded-lg"
                                            placeholder="Masukkan kategori projek..."
                                        />
                                        {errors.category && (
                                            <p className="text-sm text-red-500 flex items-center">
                                                <span className="mr-1">⚠️</span>
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-gray-700 flex items-center">
                                        <Calendar className="mr-2 h-5 w-5 text-orange-500" />
                                        Lama Pengerjaan
                                    </Label>
                                    <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50/50">
                                        <DatePickerWithRange
                                            date={dateRange}
                                            onDateChange={handleDateRangeChange}
                                        />
                                    </div>
                                    {(errors.start_date || errors.end_date) && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <span className="mr-1">⚠️</span>
                                            {errors.start_date || errors.end_date}
                                        </p>
                                    )}
                                </div>

                                {/* Budget */}
                                <div className="space-y-3">
                                    <Label htmlFor="budget" className="text-lg font-semibold text-gray-700 flex items-center">
                                        <DollarSign className="mr-2 h-5 w-5 text-orange-500" />
                                        Biaya Pengerjaan
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                                            Rp
                                        </span>
                                        <Input
                                            id="budget"
                                            type="number"
                                            step="100000"
                                            value={data.budget}
                                            onChange={(e) => setData("budget", e.target.value)}
                                            className="text-lg p-4 pl-12 border-2 border-orange-200 focus:border-orange-500 rounded-lg"
                                            placeholder="0"
                                        />
                                    </div>
                                    {errors.budget && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <span className="mr-1">⚠️</span>
                                            {errors.budget}
                                        </p>
                                    )}
                                </div>

                                {/* Template Checkbox */}
                                <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-100">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="is_template"
                                            checked={data.is_template}
                                            onChange={(e) => setData("is_template", e.target.checked)}
                                            className="h-5 w-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <Label
                                            htmlFor="is_template"
                                            className="text-lg font-medium text-gray-700 cursor-pointer"
                                        >
                                            💾 Simpan sebagai template
                                        </Label>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 ml-8">
                                        Template dapat digunakan untuk membuat projek serupa di masa depan
                                    </p>
                                </div>
                            </CardContent>
                            
                            <CardFooter className="bg-gray-50 p-8 rounded-b-lg">
                                <div className="flex justify-end space-x-4 w-full">
                                    <Button 
                                        variant="outline" 
                                        asChild 
                                        className="px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100"
                                    >
                                        <Link href="/projects">Batal</Link>
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-8 py-3 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Briefcase className="mr-2 h-5 w-5" />
                                                Simpan Projek
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}